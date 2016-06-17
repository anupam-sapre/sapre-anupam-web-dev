var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require("bcrypt-nodejs");
var FacebookStrategy = require('passport-facebook').Strategy;

module.exports = function(app,models) {

    var userModel = models.userModel;

    app.post("/api/user", createUser);
    app.get("/api/user", getUsers);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);
    app.post("/api/login", passport.authenticate('local'), login);
    app.post("/api/logout", logout);
    app.get ('/api/loggedin', loggedin);
    app.post ('/api/register', register);
    app.get('/auth/facebook',passport.authenticate('facebook'));
    app.get('/auth/facebook/callback', passport.authenticate('facebook', {
        successRedirect: '/assignment/#/user',
        failureRedirect: '/assignment/#/login'
    }));

    var facebookConfig = {
        clientID     : process.env.FACEBOOK_CLIENT_ID,
        clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL  : process.env.FACEBOOK_CALLBACK_URL
    };

    
    passport.use('local',new LocalStrategy(localStrategy));
    passport.use(new FacebookStrategy(facebookConfig,facebookLogin))
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);


    function facebookLogin(token, refreshToken, profile, done) {
        userModel
            .findUserByFacebookId(profile.id)
            .then(
                function (facebookUser) {
                    if(facebookUser){
                        return done(null,facebookUser);
                    } else{
                        facebookUser = {
                            username:  profile.displayName.replace(/ /g,''),
                            facebook: {
                                token: token,
                                id: profile.id,
                                displayName: profile.displayName
                            }
                        };
                        userModel.createUser(facebookUser)
                            .then(
                                function (user) {
                                    done(null,user);
                                }
                            );
                    }
                }
            )
    }

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function localStrategy(username, password, done) {
        userModel
            .findUserByUsername(username)
            .then(
                function(user) {
                    if(user &&  bcrypt.compareSync(password, user.password)) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    function logout(req,res) {
        req.logOut();
        res.send(200);
    }

    /*function login(req, res) {
        var username= req.body.username;
        var password=req.body.password;
        userModel
            .findUserByCredentials(username, password)
            .then(
                function (user) {


                    res.json(user);
                },
                function(err) {
                    res.statusCode(404).send(err);
                }
            )
    }
*/
    function deleteUser(req, res) {
        var id = req.params.userId;

        userModel
            .deleteUser(id)
            .then(
                function(stats) {
                    console.log(stats);
                    res.send(200);
                },
                function(error) {
                    res.statusCode(404).send(error);
                }
            );
    }

    function updateUser(req, res) {
        var id = req.params.userId;
        var newUser = req.body;

        userModel
            .updateUser(id, newUser)
            .then(
                function(stats) {
                    console.log(stats);
                    res.send(200);
                },
                function(error) {
                    res.statusCode(404).send(error);
                }
            );
    }

    function createUser(req, res) {
        var user = req.body;

        userModel
            .createUser(user)
            .then(
                function(user) {
                    res.json(user);
                },
                function(error) {
                    res.statusCode(400).send(error);
                }
            )

    }

    function findUserById(req, res) {
        var id = req.params.userId;

        userModel
            .findUserById(id)
            .then(
                function(user) {
                    res.send(user);
                },
                function(error) {
                    res.statusCode(404).send(error);
                }
            )
    }

    function getUsers(req, res) {
        var username = req.query['username'];
        var password = req.query['password'];
        if(username && password) {
            findUserByCredentials(username, password,req, res);
        } else if(username) {
            findUserByUsername(username, res);
        } else {
            res.send(users);
        }
    }

    function findUserByCredentials(username, password,req, res) {
        userModel
            .findUserByCredentials(username, password)
            .then(
                function (user) {


                    res.json(user);
                },
                function(err) {
                    res.statusCode(404).send(err);
                }
            )
    }

    function findUserByUsername(username, res) {
        userModel
            .findUserByUsername(username)
            .then(
                function(user) {
                    res.send(user);
                },
                function(error) {
                    res.statusCode(404).send(error);
                }
            )
    }

    function register (req, res) {
        var username = req.body.username;
        var password = req.body.password;
        userModel.findUserByUsername(username)
            .then(function (user) {
                if(user){
                    res.status("400").send("UserName already in use");
                    return;
                }
                else{
                    req.body.password = bcrypt.hashSync(req.body.password);
                    return userModel.createUser(req.body);
                }
            },
            function (err) {
                res.status(400).send(err);
            })
            .then(
                function (user) {
                    if(user){
                        req.login(user,function (err) {
                            if(err){
                                res.status(400).send(err);
                            }
                            else{
                                res.json(user);
                            }
                        });
                    }
                },function (err) {
                    res.status(400).send(err);
                }
            );

        ;
    }

};

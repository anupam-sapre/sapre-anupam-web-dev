module.exports = function(app,models) {

    var projUserModel = models.projUserModel;

    app.post("/proj/user", createUser);
    app.get("/proj/user", findUserByCredentials);
    app.get("/proj/user/:userId", findUserById);
    app.put("/proj/user/:userId", updateUser);

    function createUser(req, res) {
        var user = req.body;

        projUserModel
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

    function findUserByCredentials(req, res) {
        var username = req.query['username'];
        var password = req.query['password'];
        projUserModel
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

    function updateUser(req, res) {
        var id = req.params.userId;
        var newUser = req.body;

        projUserModel
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

    function findUserById(req, res) {
        var id = req.params.userId;

        projUserModel
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


};
module.exports = function() {

    var mongoose = require("mongoose")
    var UserSchema = require("./user.schema.server.js")();
    var User = mongoose.model("ProjectUser", UserSchema);

    var api = {
        createUser: createUser,
        findUserByCredentials:findUserByCredentials,
        updateUser:updateUser,
        findUserById:findUserById,
        findUserByUsername:findUserByUsername,
        findUserByGoogleId:findUserByGoogleId,
        findAllUsersByUsername:findAllUsersByUsername
    };
    return api;


    function createUser(user) {
        return User.create(user);
    }
    function findUserByCredentials(username, password) {
        return User.findOne({username: username, password: password});
    }
    function updateUser(userId, user) {
        delete user._id;
        return User
            .update({_id: userId},{
                $set: {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    gender:user.gender,
                    dob:user.dob,
                    company:user.company
                }
            });
    }

    function findUserById(userId) {
        return User.findById(userId);
    }
    function findUserByUsername(username) {
        return User.findOne({username:username});
    }

    function findAllUsersByUsername(username) {
        return User.find({username: new RegExp('^'+username+'$', "i")});
    }

    function findUserByGoogleId(googleId) {
        return User.findOne({'google.id': googleId});
    }


};
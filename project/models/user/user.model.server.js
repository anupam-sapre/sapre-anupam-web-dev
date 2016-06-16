module.exports = function() {

    var mongoose = require("mongoose")
    var UserSchema = require("./user.schema.server.js")();
    var User = mongoose.model("ProjectUser", UserSchema);

    var api = {
        createUser: createUser,
        findUserByCredentials:findUserByCredentials
    };
    return api;


    function createUser(user) {
        return User.create(user);
    }
    function findUserByCredentials(username, password) {
        return User.findOne({username: username, password: password});
    }


};
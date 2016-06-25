module.exports = function() {
    var mongoose = require("mongoose");
    var JobSchema = require("./../job/job.schema.server.js");
    var UserSchema = mongoose.Schema({
        username: {type: String, required: true},
        password: String,
        firstName: String,
        lastName: String,
        email:String,
        accountType:String,
        company:String,
        phone: String,
        dob: Date,
        gender:String,
        skills:String,
        google: {
            id:    String,
            token: String,
            displayName: String
        },
        applications: [String],
        connections:[{user_id:String,name:String}],
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "project.user"});

    return UserSchema;
};
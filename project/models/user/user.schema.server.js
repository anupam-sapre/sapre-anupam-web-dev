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
        phone: String,
        dob: Date,
        jobs: [JobSchema],
        connections:[String],
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "project.user"});

    return UserSchema;
};
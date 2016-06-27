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
        photoUrl:{type:String, default:"https://goo.gl/PJZXJ6"},
        resumeUrl:String,
        google: {
            id:    String,
            token: String,
            displayName: String
        },
        applications: [String],
        selectedJobs:[String],
        connections:[{user_id:String,name:String}],
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "project.user"});

    return UserSchema;
};
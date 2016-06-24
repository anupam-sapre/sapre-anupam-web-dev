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
        jobs: [JobSchema],
        google: {
            id:    String,
            token: String,
            displayName: String
        },
        applications: [{
            application :{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'ProjectJob'
            }
        }],
        connections:[{user_id:String,name:String}],
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "project.user"});

    return UserSchema;
};
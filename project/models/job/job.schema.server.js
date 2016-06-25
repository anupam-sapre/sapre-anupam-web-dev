module.exports = function() {
    var mongoose = require("mongoose");
    var UserSchema = require("./../user/user.schema.server.js");
    var JobSchema = mongoose.Schema({
        company: String,
        postedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ProjectUser'
        },
        jobtitle:String,
        jobkey:String,
        type:String,
        snippet:String,
        city:String,
        url:String,
        applicants: [String],
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "project.job"});

    return JobSchema;
};
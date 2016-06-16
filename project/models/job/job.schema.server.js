module.exports = function() {
    var mongoose = require("mongoose");
    var UserSchema = require("./../user/user.schema.server.js");
    var JobSchema = mongoose.Schema({
        employer: String,
        postedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ProjectUser'
        },
        desc: String,
        title: String,
        type:String,
        applicants: [{
            applicant :{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'ProjectUser'
            }
        }],
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "project.job"});

    return JobSchema;
};
module.exports = function() {

    var mongoose = require("mongoose")
    var JobSchema = require("./job.schema.server.js")();
    var Job = mongoose.model("ProjectJob", JobSchema);

    var api = {
        findByJobKey: findByJobKey,
        createJob:createJob,
        findJobsByUserId:findJobsByUserId

    };
    return api;


    function findByJobKey(jobkey) {
        return Job.findOne({'jobkey': jobkey});
    }

    function createJob(job) {
        return Job.create(job);
    }
    
    function findJobsByUserId(userId) {
        return Job.find({'applicants.applicant':userId})
    }
}
module.exports = function() {

    var mongoose = require("mongoose")
    var JobSchema = require("./job.schema.server.js")();
    var Job = mongoose.model("ProjectJob", JobSchema);

    var api = {
        findByJobKey: findByJobKey,
        createJob:createJob,
        findJobsByUserId:findJobsByUserId,
        deleteJob:deleteJob,
        findJobDescription:findJobDescription,
        findJobsByPostedId:findJobsByPostedId

    };
    return api;


    function findByJobKey(jobkey) {
        return Job.findOne({'jobkey': jobkey});
    }

    function createJob(job) {
        return Job.create(job);
    }
    
    function findJobsByUserId(userId) {
        return Job.find({applicants: userId});
    }

    function findJobsByPostedId(userId) {
        return Job.find({postedBy:userId})
    }

    function deleteJob(jobid) {
        return Job.remove({_id:jobid});
    }

    function findJobDescription(searchInput) {
        return Job.find({snippet:  { "$regex": searchInput, "$options": "i" }});
    }
}

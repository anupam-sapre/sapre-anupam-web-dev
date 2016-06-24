module.exports = function(app,models) {

    var jobModel = models.jobModel;
    app.post("/proj/job", createJob);
    app.get("/proj/job", findJobByJobkey);
    app.put("/proj/job",applyJob);
    app.get("/proj/job/user/:userId",findJobsByUserId);


    function applyJob(req,res) {
        var jobs = req.body;
        var jobkey = jobs.jobId;
        jobModel
            .findByJobKey(jobkey)
            .then(
                function (job) {
                    job.applicants.push(jobs.userId);
                    job.save(function (){});
                }
                ,function(err) {
                    res.statusCode(404).send(err);
                }
            );
    }

    function createJob(req, res) {
        var job = req.body;
        jobModel
            .createJob(job)
            .then(
                function(job) {
                    res.json(job);
                },
                function(error) {
                    res.statusCode(400).send(error);
                }
            )

    }
    function findJobByJobkey(req, res) {
        var jobkey = req.query['jobkey'];
        jobModel
            .findByJobKey(jobkey)
            .then(
                function (job) {
                    res.json(job);
                },
                function(err) {
                    res.statusCode(404).send(err);
                }
            )
    }

    function findJobsByUserId(req,res) {
        var userId = req.params.userId;
        jobModel.findJobsByUserId(userId)
            .then(
                function (jobs) {
                    res.json(jobs);
                },
                function (err) {
                    res.statusCode(404).send(err);
                }
            )
    }
}

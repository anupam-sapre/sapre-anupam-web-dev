module.exports = function(app,models) {

    var jobModel = models.jobModel;
    app.post("/proj/job", createJob);
    app.get("/proj/job", findJobByJobkey);
    app.put("/proj/job",applyJob);
    app.delete("/proj/job",deleteJob);
    app.get("/proj/job/user/:userId",findJobsByUserId);
    app.get("/proj/job/posted/:userId",findJobsByPostedId);
    app.post("/proj/job/internal",createJobInternal);
    app.put("/proj/job/internal",deleteApplication);
    app.get("/proj/job/internal/:searchInput",findJobDescription);



    function applyJob(req,res) {
        var jobs = req.body;
        var jobkey = jobs.jobId;
        jobModel
            .findByJobKey(jobkey)
            .then(
                function (job) {
                    job.applicants.push(jobs.userId);
                    job.save(function (){});
                    res.send(job);
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

    function createJobInternal(req,res) {
        var job = req.body;
        jobModel
            .createJob(job)
            .then(
                function(job) {
                    if(job.jobkey){
                        res.json(job);
                    }
                    else{
                        job.jobkey=job._id;
                        job.save();
                        res.json(job);
                    }
                },
                function(error) {
                    res.statusCode(400).send(error);
                }
            )
    }

    function findJobsByPostedId(req,res) {
        var userId = req.params.userId;
        jobModel.findJobsByPostedId(userId)
            .then(
                function (jobs) {
                    res.json(jobs);
                },
                function (err) {
                    res.statusCode(404).send(err);
                }
            )
    }

    function deleteJob(req,res) {
        var jobId = req.params.jobId;

        jobModel
            .deleteJob(jobId)
            .then(
                function(stats) {
                    console.log(stats);
                    res.send(200);
                },
                function(error) {
                    res.statusCode(404).send(error);
                }
            );
    }

    function deleteApplication(req,res) {
        var userId = req.body.userId;
        var jobId = req.body.jobId;
        jobModel.
            findByJobKey(jobId)
            .then(
                function(job) {
                    var appli = job.applicants;
                    var ind = appli.indexOf(userId);
                    if (ind > -1) {
                        appli.splice(ind, 1);
                    }
                    job.applicants = appli;
                    job.save();
                    res.send(200);
                },
                function(error) {
                    res.statusCode(404).send(error);
                }
            )
    }

    function findJobDescription(req,res) {
        var searchInput = req.params.searchInput;
        jobModel
            .findJobDescription(searchInput)
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

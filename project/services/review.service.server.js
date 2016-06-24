module.exports = function(app,models) {

    var reviewModel = models.reviewModel;
    var projectUserModel = models.projUserModel;
    app.post("/proj/review", createReview);
    app.get("/proj/review",findReviewsByUserAndJob);
    app.get("/proj/review/:reviewId",findReviewById);
    app.delete("/proj/review/:reviewId", deleteReview);
    app.put("/proj/review/:reviewId", updateReview);
    app.get("/proj/review/job/:jobId",findReviewsForJobId);

    function createReview(req, res) {
        var review = req.body;

        projectUserModel
            .findUserById(review.user_id)
            .then(
                function (user) {
                    var username = user.firstName +" " +user.lastName;
                    review.username = username;
                    reviewModel
                        .createReview(review)
                        .then(
                            function(newr) {
                                res.json(newr);
                            },
                            function(error) {
                                res.statusCode(400).send(error);
                            }
                        )
                },
                function(error) {
                    res.statusCode(400).send(error);
                }
            )


    }

    function findReviewsByUserAndJob(req, res) {
        var userId = req.query['userId'];
        var jobId = req.query['jobId'];
        reviewModel
            .findReviewsByUserAndJob(userId, jobId)
            .then(
                function (reviews) {
                    res.json(reviews);
                },
                function(err) {
                    res.statusCode(404).send(err);
                }
            )
    }

    function findReviewById(req,res) {
        var reviewId = req.params.reviewId;
        reviewModel.findReviewById(reviewId)
            .then(
            function(review) {
                res.send(review);
            },
            function(error) {
                res.statusCode(404).send(error);
            }
        )
    }
    function deleteReview(req, res){
        var reviewId = req.params.reviewId;

        reviewModel
            .deleteReview(reviewId)
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

    function updateReview(req, res){
        var reviewId = req.params.reviewId;
        var review = req.body;

        reviewModel
            .updateReview(reviewId, review)
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

    function findReviewsForJobId(req,res) {
        var jobId = req.params.jobId;
        reviewModel
            .findReviewsForJobId(jobId)
            .then(
                function(reviews) {
                    res.json(reviews);
                },
                function(error) {
                    res.statusCode(404).send(error);
                }
            )

    }
}
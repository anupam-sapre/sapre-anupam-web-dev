module.exports = function() {

    var mongoose = require("mongoose")
    var ReviewSchema = require("./review.schema.server.js")();
    var Review = mongoose.model("ProjectReview", ReviewSchema);

    var api = {
        createReview:createReview,
        findReviewsByUserAndJob:findReviewsByUserAndJob,
        findReviewById:findReviewById,
        deleteReview:deleteReview,
        updateReview:updateReview,
        findReviewsForJobId:findReviewsForJobId

    };
    return api;

    function createReview(review) {
        return Review.create(review);
    }

    function findReviewsByUserAndJob(userId,jobId) {
        return Review.find({user_id:userId,jobkey:jobId});
    }

    function findReviewById(reviewId) {
        return Review.findById(reviewId);
    }

    function deleteReview(reviewId) {
        return Review.remove({_id:reviewId});
    }

    function updateReview(reviewId,review) {
        delete review._id;
        return Review
            .update({_id: reviewId},{
                $set: review
            });
    }

    function findReviewsForJobId(jobid) {
        return Review.find({jobkey:jobid});
    }
}

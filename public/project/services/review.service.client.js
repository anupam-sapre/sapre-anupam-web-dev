(function () {
    angular
        .module("TheJobConnector")
        .factory("ReviewService", ReviewService);

    function ReviewService($http) {
        var api = {
            createReview:createReview,
            findReviewsByUserAndJob:findReviewsByUserAndJob,
            findReviewById:findReviewById,
            deleteReview:deleteReview,
            updateReview:updateReview,
            findReviewsForJobId:findReviewsForJobId

        };
        return api;


        function createReview(newReview) {

            return $http.post('/proj/review',newReview);
        }

        function findReviewsByUserAndJob(userId, jobId) {
            var url = "/proj/review?userId="+userId+"&jobId="+jobId;
            return $http.get(url);

        }

        function findReviewById(reviewId) {
            var url ="/proj/review/"+reviewId;
            return $http.get(url);
        }

        function deleteReview(reviewId) {
            var url = "/proj/review/" + reviewId;
            return $http.delete(url);
        }

        function updateReview(reviewId,review) {
            var url = "/proj/review/" + reviewId;
            return $http.put(url, review);
        }

        function findReviewsForJobId(jobId) {
            var url = "/proj/review/job/" + jobId;
            return $http.get(url);
        }
    }


})();
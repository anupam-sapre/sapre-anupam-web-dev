(function(){
    angular
        .module("TheJobConnector")
        .controller("ReviewEditController", ReviewEditController);

    function ReviewEditController($routeParams, ReviewService,$location) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.jobId = $routeParams.jobid;
        vm.reviewId = $routeParams.reviewId;
        vm.deleteReview = deleteReview;
        vm.updateReview = updateReview;

        function init() {
            ReviewService
                .findReviewById(vm.reviewId)
                .then(function(response){
                    vm.review = response.data;
                });
        }
        init();

        function deleteReview(reviewId) {
            ReviewService
                .deleteReview(reviewId)
                .then(
                    function(){
                        $location.url("/user/"+vm.userId+"/jobsearch/"+vm.jobId);
                    },
                    function() {
                        vm.error = "Unable to delete review";
                    }
                );
        }

        function updateReview(reviewId,review){
            review.jobkey = vm.jobId;
            ReviewService
                .updateReview(reviewId, review)
                .then(
                    function () {
                        $location.url("/user/"+vm.userId+"/jobsearch/"+vm.jobId);
                    },
                    function () {
                        vm.error = "Error while processing";
                    }
                );

        }

    }
})();

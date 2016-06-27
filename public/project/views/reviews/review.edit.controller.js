(function(){
    angular
        .module("TheJobConnector")
        .controller("ReviewEditController", ReviewEditController);

    function ReviewEditController($routeParams, ReviewService,$location,UserService,$rootScope) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.jobId = $routeParams.jobid;
        vm.reviewId = $routeParams.reviewId;
        vm.deleteReview = deleteReview;
        vm.updateReview = updateReview;
        vm.logout=logout;
        vm.currUser =$rootScope.currentUser;

        function init() {
            ReviewService
                .findReviewById(vm.reviewId)
                .then(function(response){
                    vm.review = response.data;
                    var backUrl = $rootScope.currentUrl;
                    var currUrl = "#/user/"+vm.userId+"/jobsearch/"+vm.jobId+"/review/"+vm.reviewId;
                    if(backUrl!=currUrl){
                        $rootScope.backUrl=$rootScope.currentUrl;
                        $rootScope.currentUrl=currUrl;
                    }
                    vm.backUrl=$rootScope.backUrl;
                    if(!vm.backUrl){
                        vm.backUrl="#/user";
                    }
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
            if (!review.review) {
                vm.error = "Review is required";
            }
            else if((5 < review.rating || review.rating < 1)||(!review.rating)){
                vm.error="Please Enter rating from 1 to 5";
            }
            else{
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

        function logout() {
            UserService.logout()
                .then(
                    function (response) {
                        $rootScope.currentUser = null;
                        $location.url("/login");
                    }
                    ,function () {
                        $rootScope.currentUser = null;
                        $location.url("/login");
                    }
                )
        }

    }
})();

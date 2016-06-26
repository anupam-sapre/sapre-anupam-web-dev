(function () {
    angular
        .module("TheJobConnector")
        .controller("ReviewNewController",ReviewNewController);

    function ReviewNewController($location,$routeParams,ReviewService,UserService,$rootScope) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.jobId = $routeParams.jobid;
        vm.createReview = createReview;
        vm.reviewError = false;
        vm.logout = logout;

        function createReview(review, rating, title) {
            vm.reviewError = false;
            if (!review) {
                vm.reviewError = true;
                vm.error = "Review is required";
            }
            else {
                var newReview = {
                    user_id: vm.userId,
                    jobkey: vm.jobId,
                    review: review,
                    rating: rating,
                    title: title
                };
                ReviewService
                    .createReview(newReview)
                    .then(function (response) {
                        var newRev = response.data;
                        if (newRev._id) {
                            $location.url("/user/" + vm.userId + "/jobsearch/" + vm.jobId);
                        } else {
                            vm.error = "Unable to create review";
                        }
                    });
            }
        }


        function logout() {
            UserService.logout()
                .then(
                    function (response) {
                        $rootScope.currentUser = null;
                        $location.url("/login");
                    }
                    , function () {
                        $rootScope.currentUser = null;
                        $location.url("/login");
                    }
                )
        }
    }
})();

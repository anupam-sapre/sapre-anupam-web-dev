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
        vm.ratingError=false;
        vm.logout = logout;
        vm.currUser =$rootScope.currentUser;

        function init() {
            var backUrl = $rootScope.currentUrl;
            var currUrl = "#/user/"+vm.userId+"/jobsearch/"+vm.jobId+"/review/new";
            if(backUrl!=currUrl){
                $rootScope.backUrl=$rootScope.currentUrl;
                $rootScope.currentUrl=currUrl;
            }
            vm.backUrl=$rootScope.backUrl;
            if(!vm.backUrl){
                vm.backUrl="#/user";
            }
        }
        init();

        function createReview(review, rating, title) {
            if (!review) {
                vm.error = "Review is required";
            }
            else if((5 < rating || rating < 1)||(!rating)){
                vm.error="Please Enter rating from 1 to 5";
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

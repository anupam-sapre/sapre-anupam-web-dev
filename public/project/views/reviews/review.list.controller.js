(function(){
    angular
        .module("TheJobConnector")
        .controller("ReviewListController", ReviewListController);

    function ReviewListController($routeParams, ReviewService,UserService, $rootScope,$location) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.jobId = $routeParams.jobid;
        vm.logout = logout;

        function init() {
            ReviewService.findReviewsByUserAndJob(vm.userId, vm.jobId)
                .then(function (response) {
                    vm.reviews = response.data;
                });
        }

        init();


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
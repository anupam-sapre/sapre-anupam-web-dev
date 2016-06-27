(function(){
    angular
        .module("TheJobConnector")
        .controller("ReviewListController", ReviewListController);

    function ReviewListController($routeParams, ReviewService,UserService, $rootScope,$location) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.jobId = $routeParams.jobid;
        vm.logout = logout;
        vm.currUser =$rootScope.currentUser;

        function init() {
            ReviewService.findReviewsByUserAndJob(vm.userId, vm.jobId)
                .then(function (response) {
                    vm.reviews = response.data;
                    var backUrl = $rootScope.currentUrl;
                    var currUrl = "#/user/"+vm.userId+"/jobsearch/"+vm.jobId+"/review";
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
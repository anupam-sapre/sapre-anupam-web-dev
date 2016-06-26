(function(){
    angular
        .module("TheJobConnector")
        .controller("PostedJobListController", PostedJobListController);

    function PostedJobListController($routeParams, JobService,UserService,$location,$rootScope) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.deleteJob=deleteJob;
        vm.logout=logout;

        function init() {
            JobService.findJobsByPostedId(vm.userId)
                .then(function (response) {
                    vm.joblist  = response.data;
                });
        }
        init();

        function deleteJob(jobId) {
            JobService
                .deleteJob(jobId)
                .then(
                    function(){
                        $location.url("/user/"+vm.userId+"/postedJob");
                    },
                    function() {
                        vm.error = "Unable to delete job";
                    }
                );
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
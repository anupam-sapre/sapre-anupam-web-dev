(function () {
    angular
        .module("TheJobConnector")
        .controller("SelectedJobsController", SelectedJobsController);

    function SelectedJobsController($routeParams,JobService,$rootScope,UserService,$location) {
        var vm =this;
        vm.userId = $routeParams.userId;
        vm.logout=logout;

        function init(){
            JobService
                .findSelectedJobsByUserId(vm.userId).then
            (
                function (jobResult) {
                    vm.jobResult =  jobResult.data;
                },
                function (err) {
                    vm.error="No jobs found currently"
                }
            )
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
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
                    var backUrl = $rootScope.currentUrl;
                    var currUrl = "#/user/"+vm.userId+"/selectedjobs";
                    if(backUrl!=currUrl){
                        $rootScope.backUrl=$rootScope.currentUrl;
                        $rootScope.currentUrl=currUrl;
                    }
                    vm.backUrl=$rootScope.backUrl;
                    if(!vm.backUrl){
                        vm.backUrl="#/user";
                    }
                },
                function (err) {
                    vm.error="No jobs found currently";
                    var backUrl = $rootScope.currentUrl;
                    var currUrl = "#/user/"+vm.userId+"/selectedjobs";
                    if(backUrl!=currUrl){
                        $rootScope.backUrl=$rootScope.currentUrl;
                        $rootScope.currentUrl=currUrl;
                    }
                    vm.backUrl=$rootScope.backUrl;
                    if(!vm.backUrl){
                        vm.backUrl="#/user";
                    }
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
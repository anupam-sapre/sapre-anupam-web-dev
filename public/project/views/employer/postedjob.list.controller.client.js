(function(){
    angular
        .module("TheJobConnector")
        .controller("PostedJobListController", PostedJobListController);

    function PostedJobListController($routeParams, JobService,UserService,$location,$rootScope) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.deleteJob=deleteJob;
        vm.logout=logout;
        vm.currUser =$rootScope.currentUser;

        function init() {
            JobService.findJobsByPostedId(vm.userId)
                .then(function (response) {
                    vm.joblist  = response.data;
                    if((vm.joblist == null) || (vm.joblist.length == 0)){
                        vm.displayMessage = "No posted jobs";
                    }
                    var backUrl = $rootScope.currentUrl;
                    var currUrl = "#/user/"+vm.userId+"/postedJob";
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

        function deleteJob(jobId) {
            JobService
                .deleteJob(jobId)
                .then(
                    function(){
                        init();
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
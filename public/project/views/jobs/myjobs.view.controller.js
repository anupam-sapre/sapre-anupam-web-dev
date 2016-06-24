(function () {
    angular
        .module("TheJobConnector")
        .controller("MyJobsController", MyJobsController);
    
    function MyJobsController($routeParams,JobService) {
        var vm =this;
        vm.userId = $routeParams.userId;


        function init(){
            JobService
                .findJobsByUserId(vm.userId).then
            (
                function (jobResult) {
                   vm.jobResult =  jobResult.data;
                },
                function (err) {
                    vm.error="No jobs found currently"
                }
            )
        }
    }
})();
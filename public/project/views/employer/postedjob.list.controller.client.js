(function(){
    angular
        .module("TheJobConnector")
        .controller("PostedJobListController", PostedJobListController);

    function PostedJobListController($routeParams, JobService) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.deleteJob=deleteJob;

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
    }
})();
(function () {
    angular
        .module("TheJobConnector")
        .controller("JobSearchController", JobSearchController);

    function JobSearchController($routeParams,JobService) {
        var vm =this;
        var userId = $routeParams.userId;
        vm.searchIndeed=searchIndeed;
        vm.jobResult={};

        function searchIndeed(text){
            var userAgent = navigator.userAgent;
            console.log(userAgent);
            vm.jobResult = JobService.searchIndeed(text,userAgent);
        }

    }
})();
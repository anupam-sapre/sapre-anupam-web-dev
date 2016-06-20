(function () {
    angular
        .module("TheJobConnector")
        .controller("JobDetailController", JobDetailController);

    function JobDetailController($routeParams,$http,JobService) {
        var vm =this;
        vm.jobid = $routeParams.jobid;
        vm.userId = $routeParams.userId;

        function init() {
            JobService.findJobDetail(vm.jobid)
                .then
                (function (res) {
                        vm.jobDetails = res.data.results;
                        vm.jobDetail = vm.jobDetails[0];
                        console.log(vm.jobDetail);
                    },
                    function (err) {
                        console.log(err);
                    }
                );
        }
        init();
    }

})();
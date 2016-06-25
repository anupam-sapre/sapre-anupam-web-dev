(function () {
    angular
        .module("TheJobConnector")
        .controller("LogoutSearchController", LogoutSearchController);

    function LogoutSearchController($routeParams,JobService) {
        var vm =this;
        vm.searchIndeed=searchIndeed;

        function searchIndeed(text){
            JobService.fetchip().then(
                function (ipaddress) {
                    var agent =navigator.userAgent;
                    JobService.searchIndeed(text,agent,ipaddress.data)
                        .then(
                            function (res) {
                                vm.jobResults = res.data.results;
                                JobService
                                    .findJobDescription(text)
                                    .then(
                                        function (res) {
                                            if(res) {
                                                var internalJobList = res.data;
                                                vm.jobResult = internalJobList.concat(vm.jobResults);
                                            }
                                            else{
                                                vm.jobResult = vm.jobResults;
                                            }
                                        }
                                        ,function (err) {
                                            vm.error='Problem fetching information Please try after some time';
                                        }
                                    )
                            },
                            function (err) {
                                vm.error='Problem fetching information Please try after some time';
                            }
                        );
                },
                function (err) {
                    vm.error='Problem fetching information Please try after some time';
                }
            );
        }
    }
})();
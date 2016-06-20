(function () {
    angular
        .module("TheJobConnector")
        .controller("JobSearchController", JobSearchController);

    function JobSearchController($routeParams,JobService) {
        var vm =this;
        vm.userId = $routeParams.userId;
        vm.searchIndeed=searchIndeed;

        function searchIndeed(text){
            JobService.fetchip().then(
                function (ipaddress) {
                    var agent =navigator.userAgent;
                    JobService.searchIndeed(text,agent,ipaddress.data)
                        .then
                        (function (res) {
                                vm.jobResult = res.data.results;
                                console.log(vm.jobResult);
                            },
                            function (err) {
                                console.log(err);
                            }
                        );
                },
                function (err) {
                    console.log(err);
                }
            );



        }


    }
})();
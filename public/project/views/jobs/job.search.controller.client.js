(function () {
    angular
        .module("TheJobConnector")
        .controller("JobSearchController", JobSearchController);

    function JobSearchController($routeParams,JobService,UserService,$rootScope,$location) {
        var vm =this;
        vm.userId = $routeParams.userId;
        vm.searchIndeed=searchIndeed;
        vm.logout=logout;

        function init() {
            var backUrl = $rootScope.currentUrl;
            var currUrl = "#/user/"+vm.userId+"/jobsearch";
            if(backUrl!=currUrl){
                $rootScope.backUrl=$rootScope.currentUrl;
                $rootScope.currentUrl=currUrl;
            }
            vm.backUrl=$rootScope.backUrl;
            if(!vm.backUrl){
                vm.backUrl="#/user";
            }
        }
        init();
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
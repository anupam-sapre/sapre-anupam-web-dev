(function(){
    angular
        .module("TheJobConnector")
        .controller("ApplicantListController", ApplicantListController);

    function ApplicantListController($routeParams, JobService,UserService,$location,$rootScope) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.jobId = $routeParams.jobId;
        vm.deleteApplication=deleteApplication;
        vm.logout=logout;

        function init() {
            UserService.findUsersByJobkey(vm.jobId)
                .then(function (response) {
                    vm.profilelist  = response.data;
                });
        }
        init();

        function deleteApplication(profileId) {
            JobService
                .deleteApplication(profileId,vm.jobId)
                .then(
                    function(){
                        UserService
                            .deleteApplication(profileId,vm.jobId)
                            .then(
                                function () {
                                    init();
                                }
                                ,function () {
                                    vm.error = "Unable to delete application";
                                }
                            )
                    },
                    function() {
                        vm.error = "Unable to delete application";
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
(function(){
    angular
        .module("TheJobConnector")
        .controller("ApplicantListController", ApplicantListController);

    function ApplicantListController($routeParams, JobService,UserService,$location) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.jobId = $routeParams.jobId;
        vm.deleteApplication=deleteApplication;

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
                                    $location.url("/user/"+vm.userId+"/postedJob/"+vm.jobId+"/applicants");
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

    }
})();
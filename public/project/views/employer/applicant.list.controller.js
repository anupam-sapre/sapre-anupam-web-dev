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
        vm.selectApplicant= selectApplicant;

        function init() {
            UserService.findUsersByJobkey(vm.jobId)
                .then(function (response) {
                    vm.profilelist  = response.data;
                    var backUrl = $rootScope.currentUrl;
                    var currUrl = "#/user/"+vm.userId+"/postedJob/"+vm.jobId+"/applicants";
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

        function selectApplicant(profileId){
            deleteApplication(profileId);
            JobService.selectApplicant(profileId,vm.jobId)
                .then(
                    function () {
                        UserService.selectApplicant(profileId,vm.jobId)
                            .then(
                                function () {
                                    vm.success="Selected Applicant";
                                }
                                ,function () {
                                    vm.error = "Unable to delete application";
                                }
                            )
                    },
                    function (res) {

                    }
                )
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
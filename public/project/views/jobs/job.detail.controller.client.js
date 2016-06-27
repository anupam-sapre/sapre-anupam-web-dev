(function () {
    angular
        .module("TheJobConnector")
        .controller("JobDetailController", JobDetailController);

    function JobDetailController($routeParams,JobService,$window,ReviewService,UserService,$location,$rootScope) {
        var vm =this;
        vm.jobid = $routeParams.jobid;
        vm.userId = $routeParams.userId;
        vm.applyJob = applyJob;
        vm.logout=logout;
        vm.getTimes=getTimes;
        vm.currUser =$rootScope.currentUser;

        function init() {
            JobService.findJobByJobkey(vm.jobid)
                .then(
                    function (job) {
                        if(job.data){
                            vm.jobDetail =job.data;
                            ReviewService
                                .findReviewsForJobId(vm.jobid)
                                .then(
                                    function (results) {
                                        vm.reviewResult =results.data;
                                        var backUrl = $rootScope.currentUrl;
                                        var currUrl = "#/user/"+vm.userId+"/jobsearch/"+vm.jobid ;
                                        if(backUrl!=currUrl){
                                            $rootScope.backUrl=$rootScope.currentUrl;
                                            $rootScope.currentUrl=currUrl;
                                        }
                                        vm.backUrl=$rootScope.backUrl;
                                        if(!vm.backUrl){
                                            vm.backUrl="#/user";
                                        }
                                        vm.showButtons =false;
                                        if(vm.currUser.accountType=='Applicant'){
                                            vm.showButtons=true;
                                        }
                                    }
                                    ,
                                    function (err) {
                                        vm.reviewResult={};
                                    }
                                )

                        }
                        else{
                            JobService.findJobDetail(vm.jobid)
                                .then
                                (function (res) {
                                        vm.jobDetails = res.data.results;
                                        vm.jobDetail = vm.jobDetails[0];
                                        JobService.createJob(vm.jobDetail.jobtitle,
                                            vm.jobDetail.jobkey,vm.jobDetail.snippet,
                                            vm.jobDetail.company,vm.jobDetail.date,vm.jobDetail.url,'Indeed');
                                        var backUrl = $rootScope.currentUrl;
                                        var currUrl = "#/user/"+vm.userId+"/jobsearch/"+vm.jobid ;
                                        if(backUrl!=currUrl){
                                            $rootScope.backUrl=$rootScope.currentUrl;
                                            $rootScope.currentUrl=currUrl;
                                        }
                                        vm.backUrl=$rootScope.backUrl;
                                        if(!vm.backUrl){
                                            vm.backUrl="#/user";
                                        }
                                        if(vm.currUser.accountType=='Applicant'){
                                            vm.showButtons=true;
                                        }
                                    },
                                    function (err) {
                                        console.log(err);
                                    }
                                );
                        }
                    }
                    ,function (err) {
                        vm.error=err;
                    }
                )
        }
        init();

        function applyJob() {
            var user = $rootScope.currentUser;
            if(user.resumeUrl) {
                if (vm.jobDetail.url) {
                    $window.open(vm.jobDetail.url, '_blank');
                }
                else {
                    JobService
                        .applyJob(vm.jobid, vm.userId)
                        .then(
                            function () {
                                UserService
                                    .applyJob(vm.jobid, vm.userId)
                                    .then(
                                        function (response) {
                                            vm.success = "Applied successfully";
                                        }
                                        , function (err) {
                                            vm.error = "Unable to save job";
                                        }
                                    )
                            }
                            ,
                            function (error) {
                                vm.error = "Unable to save job";
                            }
                        );
                }
            }
            else{
                vm.error="Please upload a resume first";
            }
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

        function getTimes(n){
            return new Array(n);
        }
    }

})();
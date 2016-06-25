(function () {
    angular
        .module("TheJobConnector")
        .controller("JobDetailController", JobDetailController);

    function JobDetailController($routeParams,$http,JobService,$window,ReviewService,UserService) {
        var vm =this;
        vm.jobid = $routeParams.jobid;
        vm.userId = $routeParams.userId;
        vm.applyJob = applyJob;

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
            if(vm.jobDetail.url){
                $window.open(vm.jobDetail.url, '_blank');
            }
            else{
                JobService
                    .applyJob(vm.jobid, vm.userId)
                    .then(
                        function () {
                            UserService
                                .applyJob(vm.jobid, vm.userId)
                                .then(
                                    function (response) {
                                        vm.success="Applied successfully";
                                    }
                                    ,function (err) {
                                        vm.error = "Unable to save job";
                                    }
                                )
                        }
                        ,
                        function(error) {
                            vm.error = "Unable to save job";
                        }
                    );
            }


        }
    }

})();
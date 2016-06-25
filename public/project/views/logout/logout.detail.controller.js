(function () {
    angular
        .module("TheJobConnector")
        .controller("LogoutDetailController", LogoutDetailController);

    function LogoutDetailController($routeParams,$http,JobService,$window,ReviewService,UserService) {
        var vm =this;
        vm.jobid = $routeParams.jobid;
        vm.suggestSignIn = suggestSignIn;

        function init() {
            JobService.findJobByJobkey(vm.jobid)
                .then(
                    function (job) {
                        if(job.data){
                            vm.jobDetail =job.data;
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

        function suggestSignIn() {
            if(vm.jobDetail.url){
                $window.open(vm.jobDetail.url, '_blank');
            }
            else{
                vm.success="Please sign in to apply for these jobs";
            }


        }
    }

})();
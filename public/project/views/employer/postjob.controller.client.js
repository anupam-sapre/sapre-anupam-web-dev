(function () {
    angular
        .module("TheJobConnector")
        .controller("PostJobController",PostJobController);

    function PostJobController($location,$routeParams,JobService,$rootScope,UserService,$location) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.createJob = createJob;
        vm.jobtitleerror = false;
        vm.logout=logout;

        function init(){
            var backUrl = $rootScope.currentUrl;
            var currUrl = "#/user/"+vm.userId+"/postedJob/new";
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

        function createJob(jobtitle,city,snippet,company) {
            vm.jobtitleerror = false;
            if(!jobtitle){
                vm.jobtitleerror = true;
                vm.error="JobTitle is required";
            }
            else {
                var newJob = {
                    postedBy:vm.userId,
                    jobtitle: jobtitle,
                    city: city,
                    snippet:snippet,
                    company:company,
                    type:'Internal'
                };
                JobService
                    .createJobInternal(newJob)
                    .then(function (response) {
                        var newJ = response.data;
                        if (newJ._id) {
                            $location.url("/user");
                        } else {
                            vm.error = "Unable to create job";
                        }
                    });
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
    }
})();

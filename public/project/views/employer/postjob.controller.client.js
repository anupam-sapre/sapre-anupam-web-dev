(function () {
    angular
        .module("TheJobConnector")
        .controller("PostJobController",PostJobController);

    function PostJobController($location,$routeParams,JobService) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.createJob = createJob;
        vm.jobtitleerror = false;

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
    }
})();

(function(){
    angular
        .module("TheJobConnector")
        .controller("ReviewListController", ReviewListController);

    function ReviewListController($routeParams, ReviewService) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.jobId = $routeParams.jobid;

        function init() {
            ReviewService.findReviewsByUserAndJob(vm.userId,vm.jobId)
                .then(function (response) {
                    vm.reviews  = response.data;
                });
        }
        init();
    }
})();
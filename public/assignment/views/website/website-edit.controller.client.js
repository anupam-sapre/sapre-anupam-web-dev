(function(){
    angular
        .module("WebAppMaker")
        .controller("EditWebsiteController", EditWebsiteController);

    function EditWebsiteController($location, $routeParams, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;
        vm.deleteWebsite = deleteWebsite;
        vm.updateWebsite = updateWebsite;
        vm.nameError = false;

        function deleteWebsite(websiteId) {
            WebsiteService
                .deleteWebsite(websiteId)
                .then(
                    function(){
                        $location.url("/user/"+vm.userId+"/website");
                    },
                    function() {
                        vm.error = "Unable to delete website";
                    }
                );
        }

        function init() {
            WebsiteService
                .findWebsiteById(vm.websiteId)
                .then(function(response){
                    vm.webSite = response.data;
                });
        }
        init();

        function updateWebsite(websiteId,webSite){
            vm.nameError = false;
            if(!webSite.name){
                vm.error="Name is required";
                vm.nameError = true;
            }
            else {
                WebsiteService
                    .updateWebsite(websiteId, webSite)
                    .then(
                        function () {
                            $location.url("/user/" + vm.userId + "/website");
                        },
                        function () {
                            vm.error = "Error while processing";
                        }
                    );
            }
        }

    }
})();
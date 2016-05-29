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

        function deleteWebsite(websiteId) {
            var result = WebsiteService.deleteWebsite(websiteId);
            if(result) {
                $location.url("/user/"+vm.userId+"/website");
            } else {
                vm.error = "Unable to delete website";
            }
        }

        function init() {
            vm.webSite = angular.copy(WebsiteService.findWebsiteById(vm.websiteId));
        }
        init();
        
        function updateWebsite(websiteId,webSite){
            var result = WebsiteService.updateWebsite(vm.websiteId,webSite);
            if(result === true){
                $location.url("/user/"+vm.userId+"/website");
            }else{
                vm.error ="Error while processing";
            }
        }

    }
})();
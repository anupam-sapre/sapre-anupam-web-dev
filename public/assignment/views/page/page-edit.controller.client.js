/**
 * Created by Anupam on 5/29/2016.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("EditPageController",EditPageController);

    function EditPageController($location,$routeParams,PageService) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.webSiteId = $routeParams.websiteId;
        vm.pageId = $routeParams.pageId;
        vm.updatePage = updatePage;
        vm.deletePage = deletePage;
        
        function init() {
            vm.page = angular.copy(PageService.findPageById(vm.pageId));
        }
        init();

        function updatePage(pageId,page){
            var result = PageService.updatePage(vm.pageId,page);
            if(result === true){
                $location.url("/user/"+vm.userId+"/website/"+vm.webSiteId+"/page");
            }else{
                vm.error ="Error while processing";
            }
        }

        function deletePage(websiteId) {
            var result = PageService.deletePage(websiteId);
            if(result) {
                $location.url("/user/"+vm.userId+"/website/"+vm.webSiteId+"/page");
            } else {
                vm.error = "Unable to delete website";
            }
        }
    }
})();
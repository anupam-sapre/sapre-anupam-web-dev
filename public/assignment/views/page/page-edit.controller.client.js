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
            PageService
                .findPageById(vm.pageId)
                .then(function(response){
                    vm.page = response.data;
                });
        }
        init();

        function updatePage(pageId,page){
            PageService
                .updatePage(vm.pageId,page)
                .then(
                    function () {
                        $location.url("/user/"+vm.userId+"/website/"+vm.webSiteId+"/page");
                    },
                    function () {
                        vm.error ="Error while processing";
                    }
                );
        }

        function deletePage(websiteId) {
            PageService
                .deletePage(websiteId)
                .then(
                    function(){
                        $location.url("/user/"+vm.userId+"/website/"+vm.webSiteId+"/page");
                    },
                    function() {
                        vm.error = "Unable to delete Page";
                    }
                );
        }
    }
})();
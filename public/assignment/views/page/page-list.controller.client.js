/**
 * Created by Anupam on 5/29/2016.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("PageListController",PageListController);

    function PageListController($routeParams,PageService) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.webSiteId = $routeParams.websiteId;

        function init() {
            vm.pages = angular.copy(PageService.findPageByWebsiteId(vm.webSiteId));
        }
        init();
    }
})();
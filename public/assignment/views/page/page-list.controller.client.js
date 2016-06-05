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
            PageService
                .findPageByWebsiteId(vm.webSiteId)
                .then(function (response) {
                    vm.pages = response.data;
                });
        }
        init();
    }
})();
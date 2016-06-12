(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController);

    function WidgetListController($sce, $routeParams, WidgetService) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.webSiteId = $routeParams.websiteId;
        vm.pageId = $routeParams.pageId;
        vm.getSafeHtml = getSafeHtml;
        vm.getSafeUrl = getSafeUrl;
        vm.sort = sort;

        function init() {
            WidgetService.findWidgetsByPageId(vm.pageId)
                .then(function (response) {
                    vm.widgets  = response.data;
                });
        }
        init();

        function getSafeHtml(widget) {
            return $sce.trustAsHtml(widget.text);
        }

        function getSafeUrl(widget) {
            var urlParts = widget.url.split("/");
            var id = urlParts[urlParts.length - 1];
            var url = "https://www.youtube.com/embed/" + id;
            return $sce.trustAsResourceUrl(url);

        }

        function sort(start, end) {
            WidgetService.sortWidget(vm.pageId,start, end)
                .then(
                    function (response) {
                        init();
                    },
                    function (err) {
                        vm.error = err;
                    }
                );
        }
    }
})();
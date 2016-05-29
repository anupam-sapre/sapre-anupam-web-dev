/**
 * Created by Anupam on 5/29/2016.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("NewWidgetController",NewWidgetController);

    function NewWidgetController(WidgetService,$routeParams,$location) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.webSiteId = $routeParams.websiteId;
        vm.pageId = $routeParams.pageId;
        vm.createWidget = createWidget;

        function createWidget(pageId,widgetType) {
            var newWidg = {
                widgetType:widgetType,
                text:""
            };
            var newWidget = WidgetService.createWidget(vm.pageId,newWidg);
            if(newWidget) {
                $location.url("/user/"+vm.userId+"/website/"+vm.webSiteId+"/page/"+vm.pageId+"/widget/"+newWidget._id);
            } else {
                vm.error = "Unable to create widget";
            }
        }
    }

})();
/**
 * Created by Anupam on 5/29/2016.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("EditWidgetController",EditWidgetController);
    
    function EditWidgetController($location,$routeParams,WidgetService) {
        var vm =this;
        vm.userId = $routeParams.userId;
        vm.webSiteId = $routeParams.websiteId;
        vm.pageId = $routeParams.pageId;
        vm.widgetId = $routeParams.widgetId;
        vm.updateWidget =updateWidget;
        vm.deleteWidget = deleteWidget;

        function init() {
            vm.widget = angular.copy(WidgetService.findWidgetById(vm.widgetId));
        }
        init();

        function updateWidget(widgetId,widget){
            var result = WidgetService.updateWidget(vm.widgetId,widget);
            if(result === true){
                $location.url("/user/"+vm.userId+"/website/"+vm.webSiteId+"/page/"+vm.pageId+"/widget");
            }else{
                vm.error ="Error while processing";
            }
        }

        function deleteWidget(widgetId) {
            var result = WidgetService.deleteWidget(widgetId);
            if(result) {
                $location.url("/user/"+vm.userId+"/website/"+vm.webSiteId+"/page/"+vm.pageId+"/widget");
            } else {
                vm.error = "Unable to delete website";
            }
        }
    }
})();
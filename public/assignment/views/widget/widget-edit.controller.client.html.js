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
            WidgetService
                .findWidgetById(vm.widgetId)
                .then(function(response){
                    vm.widget = response.data;
                });
        }
        init();

        function updateWidget(widgetId,widget){
            if(!widget.name){
                vm.error="Name is required field";
            }
            else {
                WidgetService
                    .updateWidget(widgetId, widget)
                    .then(
                        function () {
                            $location.url("/user/" + vm.userId + "/website/" + vm.webSiteId + "/page/" + vm.pageId + "/widget");
                        },
                        function () {
                            vm.error = "Error while processing";
                        }
                    );
            }
        }

        function deleteWidget(widgetId) {
            WidgetService
                .deleteWidget(widgetId)
                .then(
                    function(){
                        $location.url("/user/"+vm.userId+"/website/"+vm.webSiteId+"/page/"+vm.pageId+"/widget");
                    },
                    function() {
                        vm.error = "Unable to delete website";
                    }
                );
        }
    }
})();
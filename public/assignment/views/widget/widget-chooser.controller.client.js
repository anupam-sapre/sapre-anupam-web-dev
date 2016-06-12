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
                type:widgetType,
                text:""
            };
             WidgetService
                .createWidget(vm.pageId, newWidg)
                .then(function(response){
                    var newWidget = response.data;
                    if(newWidget._id) {
                        $location.url("/user/"+vm.userId+"/website/"+vm.webSiteId+"/page/"+vm.pageId+"/widget/"+newWidget._id);
                    } else {
                        vm.error = "Unable to create widget";
                    }
                });
        }
    }

})();
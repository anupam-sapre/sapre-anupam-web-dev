/**
 * Created by Anupam on 5/29/2016.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("NewPageController",NewPageController);

    function NewPageController($location,$routeParams,PageService) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.webSiteId = $routeParams.websiteId;
        vm.createPage = createPage;
        vm.nameError = false;
        function createPage(name, title) {
            vm.nameError = false;
            if(!name){
                vm.nameError = true;
                vm.error="Name is required";
            }
            else {
                var newP = {
                    name: name,
                    title: title
                };
                PageService
                    .createPage(vm.webSiteId, newP)
                    .then(function (response) {
                        var newPage = response.data;
                        if (newPage._id) {
                            $location.url("/user/" + vm.userId + "/website/" + vm.webSiteId + "/page");
                        } else {
                            vm.error = "Unable to create website";
                        }
                    });
            }
        }
    }
})();
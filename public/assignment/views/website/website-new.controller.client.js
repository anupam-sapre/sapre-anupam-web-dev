(function(){
    angular
        .module("WebAppMaker")
        .controller("NewWebsiteController", NewWebsiteController);

    function NewWebsiteController($location, $routeParams, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.createWebsite = createWebsite;

        function createWebsite(name, description) {
            if(!name){
                vm.error="Name is required";
            }
            else {
                var newWeb = {
                    name: name,
                    description: description
                };

                WebsiteService
                    .createWebsite(vm.userId, newWeb)
                    .then(function (response) {
                        var newWebsite = response.data;
                        if (newWebsite._id) {
                            $location.url("/user/" + vm.userId + "/website");
                        } else {
                            vm.error = "Unable to create website";
                        }
                    });
            }
        }
    }
})();
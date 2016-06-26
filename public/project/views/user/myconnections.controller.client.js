(function () {
    angular
        .module("TheJobConnector")
        .controller("MyConnectionsController", MyConnectionsController);
    
    function MyConnectionsController(UserService,$routeParams,$rootScope,$location) {
        var vm =this;
        vm.userId = $routeParams.userId;
        vm.logout = logout;
        function init(){
            UserService
                .findConnections(vm.userId).then
            (
                function (profileResult) {
                    vm.profileResult =  profileResult.data;
                },
                function (err) {
                    vm.error="No connections found"
                }
            )
        }
        init();
        function logout() {
            UserService.logout()
                .then(
                    function (response) {
                        $rootScope.currentUser = null;
                        $location.url("/login");
                    }
                    ,function () {
                        $rootScope.currentUser = null;
                        $location.url("/login");
                    }
                )
        }
    }
})();
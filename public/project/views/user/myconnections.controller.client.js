(function () {
    angular
        .module("TheJobConnector")
        .controller("MyConnectionsController", MyConnectionsController);
    
    function MyConnectionsController(UserService,$routeParams) {
        var vm =this;
        vm.userId = $routeParams.userId;

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
    }
})();
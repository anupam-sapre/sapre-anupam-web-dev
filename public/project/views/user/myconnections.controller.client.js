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
                    var backUrl = $rootScope.currentUrl;
                    var currUrl = "#/user/"+vm.userId+"/myconnections";
                    if(backUrl!=currUrl){
                        $rootScope.backUrl=$rootScope.currentUrl;
                        $rootScope.currentUrl=currUrl;
                    }
                    vm.backUrl=$rootScope.backUrl;
                    if(!vm.backUrl){
                        vm.backUrl="#/user";
                    }
                },
                function (err) {
                    vm.error="No connections found";
                    var backUrl = $rootScope.currentUrl;
                    var currUrl = "#/user/"+vm.userId+"/myconnections";
                    if(backUrl!=currUrl){
                        $rootScope.backUrl=$rootScope.currentUrl;
                        $rootScope.currentUrl=currUrl;
                    }
                    vm.backUrl=$rootScope.backUrl;
                    if(!vm.backUrl){
                        vm.backUrl="#/user";
                    }
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
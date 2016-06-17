/**
 * Created by Anupam on 5/28/2016.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);


    function ProfileController($routeParams,UserService,$location,$rootScope) {
        var vm =this;
        vm.updateUser = updateUser;
        vm.unRegister = unregister;
        var index=-1;
        var id = $rootScope.currentUser._id;
        vm.logout=logout;

        function init() {
            UserService
                .findUserById(id)
                .then(function(response){
                    vm.user = response.data;
                });
        }
        init();

        function updateUser(newUser) {
            UserService
                .updateUser(id, newUser)
                .then(
                    function(response) {
                        vm.success = "Updated successfully";
                    },
                    function(error) {
                        vm.error = "Unable to update user"
                    }
                );
        }

        function unregister() {
            UserService
                .deleteUser(id)
                .then(
                    function(){
                        $location.url("/login");
                    },
                    function() {
                        vm.error = "Unable to remove user"
                    }
                );
        }
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
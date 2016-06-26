(function () {
    angular
        .module("TheJobConnector")
        .controller("ProfileSearchController", ProfileSearchController);
    
    function ProfileSearchController($routeParams,UserService,$rootScope,$location ) {

        var vm =this;
        vm.userId = $routeParams.userId;
        vm.searchProfile = searchProfile;
        vm.logout = logout;
        function searchProfile(searchUser) {
            UserService.
                findUserByUserName(searchUser)
                .then(
                    function (res) {
                        vm.userResult = res.data;
                    },
                    function (err) {
                        vm.error = 'Not able to search the username';
                    }
                )
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
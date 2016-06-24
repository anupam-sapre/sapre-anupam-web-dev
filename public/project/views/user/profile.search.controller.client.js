(function () {
    angular
        .module("TheJobConnector")
        .controller("ProfileSearchController", ProfileSearchController);
    
    function ProfileSearchController($routeParams,UserService ) {

        var vm =this;
        vm.userId = $routeParams.userId;
        vm.searchProfile = searchProfile;

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

    }
})();
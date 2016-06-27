(function () {
    angular
        .module("TheJobConnector")
        .controller("ProfileSearchController", ProfileSearchController);
    
    function ProfileSearchController($routeParams,UserService,$rootScope,$location ) {

        var vm =this;
        vm.userId = $routeParams.userId;
        vm.searchProfile = searchProfile;
        vm.logout = logout;
        vm.addConnection=addConnection;
        vm.currUser =$rootScope.currentUser;

        function init() {
            var backUrl = $rootScope.currentUrl;
            var currUrl = "#/user/"+vm.userId+"/view";
            if(backUrl!=currUrl){
                $rootScope.backUrl=$rootScope.currentUrl;
                $rootScope.currentUrl=currUrl;
            }
            vm.backUrl=$rootScope.backUrl;
            if(!vm.backUrl){
                vm.backUrl="#/user";
            }
        }
        init();

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

        function addConnection(profile) {
            var name = profile.firstName + " "+ profile.lastName;
            UserService
                .addConnection(vm.userId,name,profile._id)
                .then(
                    function(response) {
                        vm.success = "Added to your connections";
                    },
                    function(error) {
                        vm.error = "Unable to add connection"
                    }
                );
        }

    }
})();
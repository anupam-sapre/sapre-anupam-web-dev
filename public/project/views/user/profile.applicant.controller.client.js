(function () {
    angular
        .module("TheJobConnector")
        .controller("ProfileController",ProfileController);

    function ProfileController($routeParams,UserService,$rootScope,$location) {
        var vm =this;
        vm.updateUser = updateUser;
        var index=-1;
        var id = $rootScope.currentUser._id;
        vm.logout=logout;


        function init() {
            UserService
                .findUserById(id)
                .then(function(response){
                    vm.user = response.data;
                    if(vm.user.dob){
                        vm.showDate=true;
                    }
                    vm.user.dob=new Date(vm.user.dob);

                    var backUrl = $rootScope.currentUrl;
                    var currUrl = "#/user";
                    if(backUrl!=currUrl){
                        $rootScope.backUrl=$rootScope.currentUrl;
                        $rootScope.currentUrl=currUrl;
                    }
                    vm.backUrl=$rootScope.backUrl;
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
                        vm.error = "Unable to update user";
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

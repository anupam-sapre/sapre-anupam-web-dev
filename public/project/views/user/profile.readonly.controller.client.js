(function () {
    angular
        .module("TheJobConnector")
        .controller("ProfileViewOnlyController", ProfileViewOnlyController);


    function ProfileViewOnlyController($routeParams,UserService,$rootScope,$location) {
        var vm =this;
        vm.userId = $routeParams.userId;
        vm.profileId = $routeParams.profileId;
        vm.addConnection = addConnection;
        vm.logout = logout;
        vm.currUser =$rootScope.currentUser;

        function init() {
            UserService
                .findUserById(vm.profileId)
                .then(function(response){
                    vm.disableBut =true;
                    vm.profile = response.data;
                    if(vm.profile.dob){
                        vm.showDate=true;
                    }
                    vm.profile.dob=new Date(vm.profile.dob);
                    var backUrl = $rootScope.currentUrl;
                    var currUrl = "#/user/"+vm.userId+"/view/"+vm.profileId;
                    if(backUrl!=currUrl){
                        $rootScope.backUrl=$rootScope.currentUrl;
                        $rootScope.currentUrl=currUrl;
                    }
                    vm.backUrl=$rootScope.backUrl;
                    if(!vm.backUrl){
                        vm.backUrl="#/user";
                    }
                    if(vm.userId == vm.profileId){
                        vm.disableBut =false;
                    }
                });
        }
        init();

        function addConnection() {
            var name = vm.profile.firstName + " "+ vm.profile.lastName;
            UserService
                .addConnection(vm.userId,name,vm.profileId)
                .then(
                    function(response) {
                        vm.success = "Added to your connections";
                    },
                    function(error) {
                        vm.error = "Unable to add connection"
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
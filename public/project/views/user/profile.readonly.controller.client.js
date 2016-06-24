(function () {
    angular
        .module("TheJobConnector")
        .controller("ProfileViewOnlyController", ProfileViewOnlyController);


    function ProfileViewOnlyController($routeParams,UserService) {
        var vm =this;
        vm.userId = $routeParams.userId;
        vm.profileId = $routeParams.profileId;
        vm.addConnection = addConnection;


        function init() {
            UserService
                .findUserById(vm.profileId)
                .then(function(response){
                    vm.profile = response.data;
                    vm.profile.dob=new Date(vm.profile.dob);
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


    }
})();
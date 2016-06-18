(function () {
    angular
        .module("TheJobConnector")
        .controller("ProfileController",ProfileController);

    function ProfileController($routeParams,UserService) {
        var vm =this;
        vm.updateUser = updateUser;
        var index=-1;
        var id = $routeParams.userId;

        function init() {
            UserService
                .findUserById(id)
                .then(function(response){
                    vm.user = response.data;
                    vm.user.dob=new Date(vm.user.dob);
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
    }

})();

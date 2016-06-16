(function () {
    angular
        .module("TheJobConnector")
        .controller("LoginController",LoginController);

    function LoginController($location,UserService) {

        var vm = this;
        vm.userError = false;
        vm.passError = false;
        vm.login = function(username, password) {
            vm.userError = false;
            vm.passError = false;
            if(!username){
                vm.error="Username is required";
                vm.userError = true;
            }else if(!password){
                vm.error="Password is required";
                vm.passError = true;
            }
            else {
                UserService
                    .findUserByCredentials(username, password)
                    .then(function (response) {
                        var user = response.data;
                        if (user && user._id) {
                            $location.url("/user/" + user._id);
                        } else {
                            vm.error = "User not found";
                        }
                    });
            }
        }

    }
})();
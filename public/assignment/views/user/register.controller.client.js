/**
 * Created by Anupam on 5/29/2016.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("RegisterController",RegisterController);

    function RegisterController($location,UserService) {
        var vm = this;
        vm.register = register;
        vm.userError = false;
        vm.passError = false;
        vm.verifyError = false;
        function register(username,password,verifyPassword) {
            vm.userError = false;
            vm.passError = false;
            vm.verifyError = false;
            if(!username){
                vm.error="Username is required";
                vm.userError = true;
            }else if(!password){
                vm.error="Password is required";
                vm.passError = true;
            }
            else if(!verifyPassword){
                vm.error="Verify Password is required";
                vm.verifyError = true;
            }
            else {
                if (password === verifyPassword) {
                    UserService
                        .createUser(username, password)
                        .then(function (response) {
                            var user = response.data;
                            if (user) {
                                $location.url("/user/" + user._id);
                            }
                        });
                }
                else {
                    vm.passError = true;
                    vm.verifyError = true;
                    vm.error = "Both typed passwords should match";
                }
            }
        }
    }
})();
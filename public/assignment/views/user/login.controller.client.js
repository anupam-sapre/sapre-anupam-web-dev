/**
 * Created by Anupam on 5/28/2016.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController",LoginController);

    function LoginController($location,UserService) {

        var vm = this;
        vm.login = function(username, password) {

            if(!username){
                vm.error="Username is required";
            }else if(!password){
                vm.error="Password is required";
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
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

        function register(username,password,verifyPassword) {
            if(password === verifyPassword){
                UserService
                    .createUser(username, password)
                    .then(function(response){
                        var user = response.data;
                        if(user) {
                            $location.url("/user/"+user._id);
                        }
                    });
            }
            else{
                vm.error = "Both typed passwords should match";
            }
        }
    }
})();
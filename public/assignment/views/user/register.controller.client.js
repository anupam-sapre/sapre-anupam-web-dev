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
                    var result = UserService.findUserByUsername(username);
                    if(result == false){
                        var newUser = UserService.createUser(username,password);
                        if(newUser) {
                            $location.url("/user/"+newUser._id);
                        }
                        else{
                            vm.error = "Unable to create User";
                        }
                    }
                    else{
                        vm.error ="Username is already taken. Please try different Username";
                    }
                }
                else{
                    vm.error = "Both typed passwords should match";
                }
        }
    }
})();
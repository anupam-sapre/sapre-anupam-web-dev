/**
 * Created by Anupam on 5/28/2016.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController",LoginController);
    
    function LoginController($location,UserService) {
        
        var vm = this;
        vm.login = login;

        function login(username,password) {
            var user = UserService.findUserByCredentials(username,password);
            if(user){
                var id = user._id;
                $location.url("/user/"+id);
            }else{
                vm.error ="User not found";
            }
        }

    }
})();
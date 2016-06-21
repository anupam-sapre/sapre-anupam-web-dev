(function () {
    angular
        .module("TheJobConnector")
        .controller("RegisterController",RegisterController);


    function RegisterController($routeParams,UserService,$location, $rootScope) {
        var vm =this;
        vm.register = register;

        console.log(vm.accountType);

        function init(){
            vm.accountType = $routeParams.accountType;
        }
        init();

        function register(username,password,verifyPassword,email,accountType) {
            vm.userError = false;
            vm.passError = false;
            vm.verifyError = false;
            vm.emailError=false;
            vm.accountError =false;
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
            }else if(!email){
                vm.error="Email is required";
                vm.emailError = true;
            }
            else if(!accountType){
                vm.error="Please select a Account Type";
                vm.accountError = true;
            }
            else {
                if (password === verifyPassword) {
                    /*UserService
                        .createUser(username, password,accountType,email)
                        .then(function (response) {
                            var user = response.data;
                            if (user) {
                                $location.url("/user/" + user._id);
                            }
                        });*/
                    UserService
                        .register(username, password,accountType,email)
                        .then(function (response) {
                                var user = response.data;
                                $rootScope.currentUser = user;
                                $location.url("/user");
                                /*
                                 if (user) {
                                 $location.url("/user");
                                 }*/
                            },
                            function (err) {
                                vm.error=err.data;
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
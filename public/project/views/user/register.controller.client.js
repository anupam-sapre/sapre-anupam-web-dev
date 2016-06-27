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
            if(vm.accountType=='Applicant'){
                vm.appli =true;
            }
            else if (vm.accountType=='Employer'){
                vm.empli=true;
            }
        }
        init();

        function register(username,password,verifyPassword,email,accountType,firstName,lastName) {
            vm.userError = false;
            vm.passError = false;
            vm.verifyError = false;
            vm.emailError=false;
            vm.accountError =false;
            vm.nameError=false;
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
                else if(!firstName || !lastName){
                vm.error="Please enter complete name";
                vm.nameError =true;
            }
            else {
                if (password === verifyPassword) {
                   
                    UserService
                        .register(username, password,accountType,email,firstName,lastName)
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
/**
 * Created by Anupam on 5/28/2016.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

   
    function ProfileController($routeParams,UserService) {
        var vm =this;
        vm.updateUser = updateUser;
        
        var index=-1;
        var id = $routeParams["uid"];

        function init() {
            vm.user = angular.copy(UserService.findUserById(id));
        }
        init();
        function updateUser(newUser) {
            var result = UserService.updateUser(id, newUser);
            if(result === true){
                vm.success = "Profile Updated Successfully";
            }else{
                vm.error ="Error while processing";
            }
        }
    }
})();
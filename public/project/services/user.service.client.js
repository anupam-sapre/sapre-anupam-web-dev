(function(){
    angular
        .module("TheJobConnector")
        .factory("UserService", UserService);


    function UserService($http) {
        var api = {
            createUser: createUser,
            findUserByCredentials:findUserByCredentials
        };
        return api;

        function createUser(username, password,accountType,email) {
            var user = {
                username: username,
                password: password,
                accountType:accountType,
                email:email
            };
            return $http.post("/proj/user", user);
        }
        function findUserByCredentials(username, password) {
            var url = "/proj/user?username="+username+"&password="+password;
            return $http.get(url);

        }
    }
})();
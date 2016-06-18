(function(){
    angular
        .module("TheJobConnector")
        .factory("UserService", UserService);


    function UserService($http) {
        var api = {
            createUser: createUser,
            findUserByCredentials:findUserByCredentials,
            findUserById:findUserById,
            updateUser:updateUser
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

        function updateUser(id, newUser) {
            var url = "/proj/user/" + id;
            return $http.put(url, newUser);
        }

        function findUserById(id) {
            var url = "/proj/user/" + id;
            return $http.get(url);
        }
    }
})();
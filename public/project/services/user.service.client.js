(function(){
    angular
        .module("TheJobConnector")
        .factory("UserService", UserService);


    function UserService($http) {
        var api = {
            createUser: createUser,
            findUserByCredentials:findUserByCredentials,
            findUserById:findUserById,
            updateUser:updateUser,
            login:login,
            logout:logout,
            register: register
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

        function login(username,password) {
            var user = {
                username: username,
                password: password
            };
            return $http.post("/proj/login", user);
        }
        function logout() {
            return $http.post("/proj/logout");
        }

        function register(username, password,accountType,email) {
            var user = {
                username: username,
                password: password,
                accountType:accountType,
                email:email
            };
            return $http.post("/proj/register", user);
        }
    }
})();
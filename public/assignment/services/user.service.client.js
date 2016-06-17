(function(){
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);


    function UserService($http) {
        var api = {
            createUser: createUser,
            findUserByCredentials: findUserByCredentials,
            findUserById: findUserById,
            updateUser: updateUser,
            deleteUser: deleteUser,
            findUserByUsername: findUserByUsername,
            register: register,
            login:login,
            logout:logout
        };
        return api;

        function createUser(username, password) {
            var user = {
                username: username,
                password: password
            };
            return $http.post("/api/user", user);
        }

        function deleteUser(userId) {
            var url = "/api/user/" + userId;
            return $http.delete(url);
        }

        function updateUser(id, newUser) {
            var url = "/api/user/" + id;
            return $http.put(url, newUser);
        }

        function findUserById(id) {
            var url = "/api/user/" + id;
            return $http.get(url);
        }

        function findUserByCredentials(username, password) {
            var url = "/api/user?username="+username+"&password="+password;
            return $http.get(url);

        }

        function findUserByUsername(username) {
            var url = "/api/user/" + username;
            return $http.get(url);
        }
        
        function login(username,password) {
            var user = {
                username: username,
                password: password
            };
            return $http.post("/api/login", user);
        }

        function logout() {
            return $http.post("/api/logout");
        }

        function register(username, password) {
            var user = {
                username: username,
                password: password
            };
            return $http.post("/api/register", user);
        }
    }
})();
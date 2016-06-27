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
            register: register,
            applyJob:applyJob,
            findUserByUserName:findUserByUserName,
            addConnection:addConnection,
            findConnections:findConnections,
            findUsersByJobkey:findUsersByJobkey,
            deleteApplication:deleteApplication,
            selectApplicant:selectApplicant
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

        function register(username, password,accountType,email,firstName,lastName) {
            var user = {
                username: username,
                password: password,
                accountType:accountType,
                email:email,
                firstName:firstName,
                lastName:lastName
            };
            return $http.post("/proj/register", user);
        }
        function applyJob(jobId,userid) {
            var job={
                jobId:jobId,
                userId:userid
            }
            return $http.put('/proj/user/job/apply',job);
        }
        function findUserByUserName(searchName){
            var url = "/proj/user/search/" + searchName;
            return $http.get(url);
        }

        function addConnection(userId,name,profileId) {
            var url ="/proj/user/conn/"+userId;
            var prof ={
                userId:userId,
                name:name,
                profileId:profileId
            }
            return $http.put(url,prof);
        }

        function findConnections(userId) {
            var url ="/proj/user/conn/"+userId;
            return $http.get(url);
        }

        function findUsersByJobkey(jobId) {
            var url='/proj/user/job/'+jobId;
            return $http.get(url);
        }

        function deleteApplication(profileId,jobId) {
            var idDetails = {
                userId:profileId,
                jobId:jobId
            }
            var url = "/proj/user/internal/"+profileId;
            return $http.put(url,idDetails);
        }

        function selectApplicant(profileId,jobId) {
            var idDetails = {
                userId:profileId,
                jobId:jobId
            }
            var url = "/proj/user/selectAppli/"+profileId;
            return $http.put(url,idDetails);
        }
    }
})();
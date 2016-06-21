(function() {
    angular
        .module("TheJobConnector")
        .config(Config);
    function Config($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "views/user/home.view.client.html",
                controller: "HomeController",
                controllerAs: "model"
            })
            .when("/login", {
                templateUrl: "views/user/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "views/user/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/user", {
                templateUrl: "views/user/profile.applicant.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: { loggedin: checkLoggedin }
            })
            .when("/user/:userId/jobsearch", {
                templateUrl: "views/jobs/job.search.view.client.html",
                controller: "JobSearchController",
                controllerAs: "model"
            })
            .when("/user/:userId/jobsearch/:jobid", {
                templateUrl: "views/jobs/job.detail.view.client.html",
                controller: "JobDetailController",
                controllerAs: "model"
            })
            .otherwise({
                redirectTo: "/home"
            });

        function checkLoggedin($q, $timeout, $http, $location, $rootScope) {
            var deferred = $q.defer();
            $http.get('/proj/loggedin').success(function(user) {
                $rootScope.errorMessage = null;
                if (user !== '0') {
                    $rootScope.currentUser = user;
                    deferred.resolve();
                } else {
                    $rootScope.currentUser=null;
                    deferred.reject();
                    $location.url('/');
                }
            });
            return deferred.promise;
        }
    }
})();
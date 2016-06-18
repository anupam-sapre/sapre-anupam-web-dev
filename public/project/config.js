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
            .when("/user/:userId", {
                templateUrl: "views/user/profile.applicant.view.client.html",
                controller: "ProfileController",
                controllerAs: "model"
            })
            .when("/user/:userId/jobsearch", {
                templateUrl: "views/jobs/job.search.view.client.html",
                controller: "JobSearchController",
                controllerAs: "model"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
})();
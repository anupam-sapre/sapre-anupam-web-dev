(function(){
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);


    function WebsiteService($http) {
        var api = {
            createWebsite: createWebsite,
            findWebsitesByUser: findWebsitesByUser,
            deleteWebsite: deleteWebsite,
            findWebsiteById:findWebsiteById,
            updateWebsite:updateWebsite
        };
        return api;

        function deleteWebsite(websiteId) {
            var url = "/api/website/" + websiteId;
            return $http.delete(url);
        }

        function createWebsite(developerId, webSite) {
            var newWebsite = {
                name: webSite.name,
                description: webSite.description,
                developerId: developerId
            };
            return $http.post("/api/user/"+developerId+"/website", newWebsite);
        }

        function findWebsitesByUser(userId) {
            return $http.get("/api/user/"+userId+"/website");
        }

        function findWebsiteById(websiteId){
            var url = "/api/website/" + websiteId;
            return $http.get(url);
        }

        function updateWebsite(websiteId,webSite) {
            var url = "/api/website/" + websiteId;
            return $http.put(url, webSite);
        }
    }
})();
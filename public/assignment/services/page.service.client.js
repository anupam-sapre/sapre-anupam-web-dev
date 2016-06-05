/**
 * Created by Anupam on 5/29/2016.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService($http) {
        var api = {
            createPage: createPage,
            findPageByWebsiteId: findPageByWebsiteId,
            findPageById: findPageById,
            updatePage:updatePage,
            deletePage:deletePage
        };
        return api;

        function createPage(websiteId,page) {
            var newPage = {
                name: page.name,
                title: page.title,
                websiteId: websiteId
            };
            return $http.post("/api/website/"+websiteId+"/page", newPage);
        }

        function findPageByWebsiteId(webSiteId) {
            return $http.get("/api/website/"+webSiteId+"/page");
        }

        function findPageById(pageId) {
            return $http.get("/api/page/"+pageId);
        }

        function updatePage(pageId,page) {
            var url = "/api/page/" + pageId;
            return $http.put(url, page);
        }

        function deletePage(pageId) {
            var url = "/api/page/" + pageId;
            return $http.delete(url);
        }
    }
})();
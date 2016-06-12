module.exports = function(app,models) {

    /*var pages = [
        { "_id": "321", "name": "Post 1", "websiteId": "456" },
        { "_id": "432", "name": "Post 2", "websiteId": "456" },
        { "_id": "543", "name": "Post 3", "websiteId": "456" }
    ];*/
    var pageModel = models.pageModel;
    app.post("/api/website/:websiteId/page", createPage);
    app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);


    function createPage(req,res) {
        var newPage = req.body;
        var websiteId = req.params.websiteId;
        pageModel
            .createPage(websiteId,newPage)
            .then(
                function(page) {
                    res.json(page);
                },
                function(error) {
                    res.statusCode(400).send(error);
                }
            )

    }

    function findAllPagesForWebsite(req,res) {
        var webSiteId = req.params.websiteId;
        pageModel
            .findAllPagesForWebsite(webSiteId)
            .then(
                function (pages) {
                    res.json(pages);
                },
                function(err) {
                    res.statusCode(404).send(err);
                }
            )

    }

    function findPageById(req,res) {
        var pageId = req.params.pageId;
        pageModel
            .findPageById(pageId)
            .then(
                function(page) {
                    res.send(page);
                },
                function(error) {
                    res.statusCode(404).send(error);
                }
            )

    }

    function updatePage(req,res) {
        var pageId = req.params.pageId;
        var page = req.body;

        pageModel
            .updatePage(pageId, page)
            .then(
                function(stats) {
                    console.log(stats);
                    res.send(200);
                },
                function(error) {
                    res.statusCode(404).send(error);
                }
            );

    }

    function deletePage(req, res){
        var pageId = req.params.pageId;
        pageModel
            .deletePage(pageId)
            .then(
                function(stats) {
                    console.log(stats);
                    res.send(200);
                },
                function(error) {
                    res.statusCode(404).send(error);
                }
            );

    }
}
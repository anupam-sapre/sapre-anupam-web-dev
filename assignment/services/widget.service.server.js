module.exports = function(app,models) {

    var widgetModel = models.widgetModel;

    var multer = require('multer'); // npm install multer --save
    var upload = multer({ dest: __dirname+'/../../public/uploads' });
    var widgets = [
        { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
        { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "http://lorempixel.com/400/200/"},
        { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": '<p class="first-text">Investing in undersea internet cables has been a <a href="http://gizmodo.com/why-more-technology-giants-are-paying-to-lay-their-own-1703904291">big part of data strategy </a>plans for tech giants in recent years. Now Microsoft and Facebook are teaming up for the mother of all cables: A 4,100-mile monster that can move 160 Tbps, which will make it the highest-capacity cable on Earth. The cable even has a name, MAREA, and it will break ground (break waves?) later this year. Hopefully it can handle all your selfies.</p>'},
        { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E" },
        { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
    ];

    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);
    app.post ("/api/upload", upload.single('myFile'), uploadImage);
    app.put("/api/page/:pageId/widget",sortWidget);


    function uploadImage(req, res) {
        var widgetId      = req.body.widge.tId;
        var pageId        = req.body.pageId;
        var webSiteId     = req.body.webSiteId;
        var userId        = req.body.userId;
        var width         = req.body.width;
        var myFile        = req.file;
        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in upload folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;
        for(var i in widgets){
            if(widgets[i]._id ===widgetId){

                /*widgets[i].url = "/uploads/"+filename;*/
                widgetModel
                    .updateWidget(widgetId, {_id:widgetId,url:filename})
                    .then(
                        function(stats) {
                            console.log(stats);
                            res.redirect("/assignment/#/user/"+userId+"/website/"+webSiteId+"/page/"+pageId+"/widget/"+widgetId);
                        },
                        function(error) {
                            res.statusCode(404).send(error);
                        }
                    );
            }
        }

    }
    function createWidget(req, res) {
        var newWidget = req.body;
        var pageId = req.params.pageId;
        var prio=-1;
        widgetModel.findAllWidgetsForPage(pageId)
            .then(
                function (widgetList) {
                    widgetList.forEach(function(widget){
                        if(widget.priority>prio){
                            prio=widget.priority;
                        }
                    });
                    prio++;
                    newWidget.priority=prio;
                    widgetModel
                        .createWidget(pageId,newWidget)
                        .then(
                            function(widget) {
                                res.json(widget);
                            },
                            function(error) {
                                res.statusCode(400).send(error);
                            }
                        )
                },
                function () {
                    newWidget.priority=prio;
                    widgetModel
                        .createWidget(pageId,newWidget)
                        .then(
                            function(widget) {
                                res.json(widget);
                            },
                            function(error) {
                                res.statusCode(400).send(error);
                            }
                        )
                });

    }

    function findWidgetById(req,res) {
        var widgetId = req.params.widgetId;
        widgetModel
            .findWidgetById(widgetId)
            .then(
                function(widget) {
                    res.send(widget);
                },
                function(error) {
                    res.statusCode(404).send(error);
                }
            )
    }

    function updateWidget(req,res) {
        var widgetId = req.params.widgetId;
        var widget = req.body;
        widgetModel
            .updateWidget(widgetId, widget)
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

    function deleteWidget(req,res) {
        var widgetId = req.params.widgetId;
        widgetModel
            .deleteWidget(widgetId)
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

    function findAllWidgetsForPage(req,res) {
        var pageId = req.params.pageId;
        widgetModel
            .findAllWidgetsForPage(pageId)
            .then(
                function (widgets) {
                    res.json(widgets);
                },
                function(err) {
                    res.statusCode(404).send(err);
                }
            );
    }

    function sortWidget(req,res) {
        var pageId = req.params.pageId;
        var start = req.query['start'];
        var end = req.query['end'];
        widgetModel.findAllWidgetsForPage(pageId)
            .then(function (widgetList) {
                widgetList.forEach(function(widget){
                    if(start > end) {
                        if(widget.priority >= end && widget.priority < start) {
                            widget.priority++;
                            widget.save(function(){});
                        } else if(widget.priority == start) {
                            widget.priority = end;
                            widget.save(function(){});
                        }
                    } else {
                        if(widget.priority > start && widget.priority <= end) {
                            widget.priority--;
                            widget.save(function(){});
                        } else if(widget.priority == start) {
                            widget.priority = end;
                            widget.save(function(){});
                        }
                    }
                });
                res.send(200);
            },function(err) {
                res.statusCode(404).send(err);
            })
    }
}
(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

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

    function WidgetService() {
        var api = {
            findWidgetsByPageId: findWidgetsByPageId,
            createWidget: createWidget,
            findWidgetById: findWidgetById,
            updateWidget: updateWidget,
            deleteWidget: deleteWidget
        };
        return api;

        function findWidgetsByPageId(pageId) {
            var resultSet = [];
            for(var i in widgets) {
                if(widgets[i].pageId === pageId) {
                    resultSet.push(widgets[i]);
                }
            }
            return resultSet;
        }

        function createWidget(pageId, widget) {
            var newWidget = {
                _id: (new Date()).getTime()+"",
                widgetType: widget.widgetType,
                text: widget.text,
                pageId: pageId
            };
            widgets.push(newWidget);
            return newWidget;
        }

        function findWidgetById(widgetId) {
            for(var i in widgets){
                if(widgets[i]._id === widgetId){
                    return widgets[i];
                }
            }
            return null;
        }

        function updateWidget(widgetId,widget) {
            for(var i in widgets) {
                if(widgets[i]._id === widgetId) {
                    widgets[i].name = widget.name;
                    widgets[i].widgetType = widget.widgetType;
                    widgets[i].text = widget.text;
                    widgets[i].size = widget.size;
                    widgets[i].url = widget.url;
                    widgets[i].width = widget.width;
                    widgets[i].widgetfile = widget.widgetfile;
                    return true;
                }
            }
            return false;
        }

        function deleteWidget(widgetId) {
            for(var i in widgets) {
                if(widgets[i]._id === widgetId) {
                    widgets.splice(i, 1);
                    return true;
                }
            }
            return false;
        }
    }
})();
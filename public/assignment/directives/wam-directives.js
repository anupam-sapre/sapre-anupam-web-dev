(function(){
    angular.module("wamDirectives", [])
        .directive("wamSortable",  wamSortable);

    function wamSortable() {
        var start = -1;
        var end = -1;
        function linker(scope, element, attributes) {
            element.sortable({
                axis: 'y',
                sort: function(event, ui) {
                    start = ui.item.index();
                },
                stop: function(event, ui) {
                    end = ui.item.index();
                    if(start >= end){
                        start --;
                    }
                    scope.wamCallback({
                        start: start,
                        end: end
                    });
                    console.log(start);
                    console.log(end);
                }
            });
        }
        return {
            scope: {
                wamCallback: '&'
            },
            link: linker
        }
    }
    })();

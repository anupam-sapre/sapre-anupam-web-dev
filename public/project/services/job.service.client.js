(function() {
    angular
        .module("TheJobConnector")
        .factory("JobService", JobService);
    var publisherid= '4560520322813359';

    function JobService($http,$q) {
        var api = {
            searchIndeed:searchIndeed,
            findJobDetail:findJobDetail,
            fetchip:fetchip,
            saveJob:saveJob
        };
        return api;

        function fetchip() {
            return $http.get('https://api.ipify.org?format=json');
        }

        function searchIndeed(input,agent,ipaddress) {

            var indeedapi = 'http://api.indeed.com/ads/apisearch?publisher='+ publisherid +
                '&q='+ input +'&l=&format=json&sort=' +
                '&radius=&st=&jt=&start=&limit=&fromage=&filter=&latlong=1&co=us&chnl=' +
                '&userip='+ipaddress.data+'&useragent='+agent+'&v=2';
            return $http.get('https://crossorigin.me/'+indeedapi);


            /* var url = 'https://jobs.github.com/positions.json?description='+input+'&callback=JSON_CALLBACK';
             return $http.jsonp(url);*/

        }
        function findJobDetail(jobid) {

            var url = 'http://api.indeed.com/ads/apigetjobs?publisher='+publisherid+'&jobkeys='+jobid+'&v=2&format=json' ;
            return $http.get('https://crossorigin.me/'+url);
            /*var url = 'https://jobs.github.com/positions/'+jobid+'.json?callback=JSON_CALLBACK';
            return $http.jsonp(url);*/
        }

        function saveJob(jobId,userid) {
            var job={
                jobId:jobId,
                userId:userId
            }
            $http.put('proj/job',job);
        }


    }
})();

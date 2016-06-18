(function() {
    angular
        .module("TheJobConnector")
        .factory("JobService", JobService);
    var publisherid= '4560520322813359';

    function JobService($http) {
        var api = {
            searchIndeed:searchIndeed
        };
        return api;

        function searchIndeed(input,userAgent) {
            $http.get('https://api.ipify.org?format=json')
                .then(
                    function (ipaddress) {
                        console.log(ipaddress.data);
                        var indeedapi = 'http://api.indeed.com/ads/apisearch?publisher='+ publisherid +
                            '&q='+ input +'&l=&format=json&sort=' +
                            '&radius=&st=&jt=&start=&limit=&fromage=&filter=&latlong=1&co=us&chnl=' +
                            '&userip='+ipaddress.data+'&useragent='+userAgent+'&v=2';
                        return $http.get(indeedapi);
                    },
                    function (err) {
                        return err;
                    }
                );
        }
    }
})();

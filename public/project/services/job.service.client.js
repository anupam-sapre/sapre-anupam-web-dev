(function() {
    angular
        .module("TheJobConnector")
        .factory("JobService", JobService);
    var publisherid= '4560520322813359';

    function JobService($http,$q) {
        var api = {
            searchIndeed:searchIndeed,
            searchIndeedData:searchIndeedData,
            findJobDetail:findJobDetail,
            fetchip:fetchip,
            applyJob:applyJob,
            createJob:createJob,
            findJobByJobkey:findJobByJobkey,
            findJobsByUserId:findJobsByUserId,
            createJobInternal:createJobInternal,
            findJobsByPostedId:findJobsByPostedId,
            deleteJob:deleteJob,
            deleteApplication:deleteApplication,
            findJobDescription:findJobDescription,
            selectApplicant:selectApplicant,
            findSelectedJobsByUserId:findSelectedJobsByUserId
        };
        return api;

        function fetchip() {
            return $http.get('https://api.ipify.org?format=json');
        }

        function searchIndeed(input,agent,ipaddress) {

            var indeedapi = 'http://api.indeed.com/ads/apisearch?publisher='+ publisherid +
                '&q='+ input +'&l=&format=json&sort=' +
                '&radius=&st=&jt=&start=&limit=15&fromage=&filter=&latlong=1&co=us&chnl=' +
                '&userip='+ipaddress.data+'&useragent='+agent+'&v=2';
            return $http.get('https://crossorigin.me/'+indeedapi);

        }
        function searchIndeedData(input,agent,ipaddress,count) {

            var indeedapi = 'http://api.indeed.com/ads/apisearch?publisher='+ publisherid +
                '&q='+ input +'&l=&format=json&sort=' +
                '&radius=&st=&jt=&start='+count+'&limit=15&fromage=&filter=&latlong=1&co=us&chnl=' +
                '&userip='+ipaddress.data+'&useragent='+agent+'&v=2';
            return $http.get('https://crossorigin.me/'+indeedapi);

        }
        function findJobDetail(jobid) {

            var url = 'http://api.indeed.com/ads/apigetjobs?publisher='+publisherid+'&jobkeys='+jobid+'&v=2&format=json' ;
            return $http.get('https://crossorigin.me/'+url);
            /*var url = 'https://jobs.github.com/positions/'+jobid+'.json?callback=JSON_CALLBACK';
            return $http.jsonp(url);*/
        }

        function applyJob(jobId,userid) {
            var job={
                jobId:jobId,
                userId:userid
            }
            return $http.put('/proj/job',job);
        }

        function createJob(jobtitle,jobkey,snippet,company,date,url,type) {
            var job={
                type:'External',
                jobtitle:jobtitle,
                jobkey:jobkey,
                snippet:snippet,
                company:company,
                dateCreated:date,
                url:url
            };
            return $http.post('/proj/job',job);
        }

        function findJobByJobkey(jobkey) {
            var url = "/proj/job?jobkey="+jobkey;
            return $http.get(url);

        }

        function findJobsByUserId(userId) {
            var url = "/proj/job/user/"+userId;
            return $http.get(url);
        }

        function createJobInternal(job) {
            return $http.post('/proj/job/internal',job);
        }

        function findJobsByPostedId(userId) {
            var url = "/proj/job/posted/"+userId;
            return $http.get(url);
        }

        function deleteJob(jobId) {
            var url = "/proj/job/" + jobId;
            return $http.delete(url);
        }

        function deleteApplication(profileId,jobId) {
            var idDetails = {
                userId:profileId,
                jobId:jobId
            }
            var url = "/proj/job/internal";
            return $http.put(url,idDetails);
        }

        function findJobDescription(text) {
            var url = "/proj/job/internal/"+text;
            return $http.get(url);
        }
        
        function selectApplicant(profileId,jobId) {
            var idDetails = {
                userId:profileId,
                jobId:jobId
            }
            var url = "/proj/job/selectAppli";
            return $http.put(url,idDetails);
        }

        function findSelectedJobsByUserId(userId) {
            var url = "/proj/selectedjob/user/"+userId;
            return $http.get(url);
        }

    }
})();

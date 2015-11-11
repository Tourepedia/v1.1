var app = angular.module('tourepedia')
.factory('JobApplicationService', ['$http','apiRoot', function(http, apiRoot){
    return{
        apply: function(applicant){
            return http.post(apiRoot+'slim.php/jobApplication', applicant);
        },
        getJobs: function(){
            return http.get(apiRoot+'slim.php/jobs');
        }
    };
}]);

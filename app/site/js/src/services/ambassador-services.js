var app = angular.module('tourepedia')
.factory('AmbassadorServices', ['$http','apiRoot', function(http, apiRoot){
    return{
        apply: function(applicant){
            return http.post(apiRoot+'ambassador.php/submit', applicant);
        }
    };
}]);

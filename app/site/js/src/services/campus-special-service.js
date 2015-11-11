var app = angular.module('tourepedia')
.factory("CampusSpecialService", ['$http','apiRoot', function(http, apiRoot){

  return{
    allPlaces: function(){
      return http.get(apiRoot+'campus-special.php/trips');
    },
    placeForId: function(id){
      return http.get(apiRoot+'campus-special.php/trips/'+id);
    },
    submitPlan: function(data){
      return http.post(apiRoot+'campus-special.php/submit', data);
    }
  };

}]);

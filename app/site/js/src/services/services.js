/**
 * Created by Sudhir on 17-Jun-15.
 */

 var app = angular.module("tourepedia");


app.service('PlacesService', ['$http', "apiRoot",  function ($http, apiRoot) {

    this.placeInfo = function () {
        return $http.get(apiRoot+'slim.php/region/places');
    };

    this.placeDataForPlace = function (placeId) {
        return $http.get(apiRoot+'slim.php/places/' + placeId);
    };
}]);

app.service('AttractionService', ['$http','apiRoot', function ($http, apiRoot) {

    this.getAttractionFor = function (placeId) {
        return $http.get(apiRoot+'slim.php/' + placeId + '/attractions');
    };

    this.getRelatedPrePlannedAttractionFor = function (placeId) {
        return [];
    };
}]);

app.service('SubmitPlanService', ['$http','apiRoot', function($http, apiRoot){
    this.submitPlan = function(user){
        return $http.post(apiRoot+'slim.php/tourepedia/submitPlan', user);
    };
}]);

app.service('OurPlansService',['$http','apiRoot', function(http, apiRoot){
    this.ourPlansForPlace = function(placeId) {
        return http.get(apiRoot+'slim.php/our_trips/'+placeId);
    };
    this.ourPlanData = function (ourPlanId) {
        return http.get(apiRoot+'slim.php/our_trips_data/'+ourPlanId);
    };
}]);

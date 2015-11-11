
var app = angular.module("tourepedia")
.controller("CampusSpecialController", ['$scope','CampusSpecialService','$stateParams',"$state", function(scope, campusService, stateParams, state){

  scope.user = {
    queries:"", children: 0, male: 0, female : 0, agreement: true
  };

  scope.years = [2015, 2016, 2017];
  scope.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September','October', 'November', 'December'];
  scope.days = ['Not Sure', 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];

  scope.submittingPlan = false;
  scope.fetchingPlaces = true;
  scope.offerUpTo = {"0": false}
  scope.options = {};
  scope.options.sortByPrice = false;
  scope.typeFilter = [];
  scope.popularityFilter = [];


  scope.addTypeFilter = function (tripType) {
    scope.fetchingPlaces = true;
    if(scope.typeFilter.indexOf(tripType) != -1){
        scope.typeFilter.splice(scope.typeFilter.indexOf(tripType), 1);
    }else{
        scope.typeFilter.push(tripType);
    }
    scope.fetchingPlaces = false;
  };
  scope.addPopularityFilter = function (popularityType) {
    scope.fetchingPlaces = true;
    if(scope.popularityFilter.indexOf(popularityType) != -1){
        scope.popularityFilter.splice(scope.popularityFilter.indexOf(popularityType), 1);
    }else{
        scope.popularityFilter.push(popularityType);
    }
    scope.fetchingPlaces = false;
  };




  scope.places = [];
  campusService.allPlaces().then(function(resp){
    scope.places = resp.data;
    scope.fetchingPlaces = false;
  });



  scope.getPlace = function(id){
    campusService.placeForId(id).then(function(resp){
      scope.selectedPlace = resp.data;
    });
  };

  scope.submitPlan = function(){
    if(!scope.submittingPlan){
      scope.user.agreement = undefined;
      scope.user.typeOfTrip = scope.selectedPlace.type;
      scope.user.placeName = scope.selectedPlace.name;
      scope.submittingPlan = true;
      scope.user.journeyStartingDate = scope.user.journeyStartingDate.month+" "+scope.user.journeyStartingDate.day+", "+scope.user.journeyStartingDate.year;
      campusService.submitPlan(scope.user).then(function(resp){
        scope.submittingPlan = false;
        if(resp.data.planSubmited){
          showNotification('Plan submitted. In progress...', "#2ECC71", "5");
        }else{
          alert("We are facing some problems while submitting you plan. Please try after some time.");
        }
        scope.user = {};
        state.go("campusSpecial");
      });
    }else{
      showNotification('Please wait...', "#F1C40F", "2");
    }
  };

  if(stateParams.id !== undefined){
    scope.getPlace(stateParams.id);
  }
}]);

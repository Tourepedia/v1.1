var app = angular.module('tourepedia')
.controller('InstaBookController',['$scope','InstaBookService','$state', function(scope, instaService, state){
  scope.user = {};
  scope.user.journeyStartingDate = {};
  scope.places = ["Shimla", "Manali", "Jaipur"];
  scope.people = ["3-5","5-7","7-10","10-15", "15+"];
  scope.numOfDays = ["4-5", "5-7", "7-10"];
  scope.months = ["January", "Februrary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  scope.years = [2015, 2016];
  scope.budgets = ["5000-7000", "7000-10000"];

  var date = new Date()
  scope.user.journeyStartingDate.month  = scope.months[date.getUTCMonth()+1];
  scope.user.journeyStartingDate.year = date.getFullYear();

  scope.submitInstaBook = function(){
    scope.user.journeyStartingDate = scope.user.journeyStartingDate.month +", "+  scope.user.journeyStartingDate.year;
    instaService.submit(scope.user).then(function(resp){
      var data = resp.data;
      if(data.planSubmited){
        showNotification('Plan submitted...', "#2ECC71", "5");
      }else{
        alert("We are facing some problems while submitting you plan. Please try after some time.");
      }
      scope.user = {};
      state.go("home");
    });
  };
}]);

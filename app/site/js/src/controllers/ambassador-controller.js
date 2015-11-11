var app = angular.module('tourepedia')
.controller("AmbassadorController",['$scope','AmbassadorServices','$state', function(scope, service, state){
  scope.applicant = {};
  scope.submittingForm = false;
  scope.submitAmbasodorApplication = function(){
    if(!scope.submittingForm){
      scope.submittingForm = true;
      service.apply(scope.applicant).then(function(resp){
        var data = resp.data;
        if(data.applicationSubmitted){
          showNotification('Form Submitted. You will be contact soon.', "green", "5");
          state.go('home');
        }else{
          alert("Error while submitting form. Please try after sometime. Thanks");
        }
        scope.submittingForm = false;
      });
    }else{
      showNotification('Please wait...', "yellow", "2");
    }
  }
}]);

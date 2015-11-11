/**
 * Created by Sudhir on 17-Jun-15.
 */
"use strict";
var app = angular.module("tourepedia", ['ui.router', 'tourepedia.shared']);

app.config(['$stateProvider', '$urlRouterProvider',"$locationProvider", function($stateProvider, $urlRouterProvider, locationProvider){
  //  locationProvider.html5Mode({enabled: true, requireBase: false});
    $urlRouterProvider.otherwise('/');
    $stateProvider
        .state('home',{
            url:'/',
            views:{
                'place-info':{
                    templateUrl: './site/html/views/home.html'
                },
                'fix-plans':{
                    templateUrl:'./site/html/views/fix-plans.html'
                },
                'testimonials':{
                    templateUrl:'./site/html/views/testimonials.html'
                }
            }
        })
        .state('selectDestination',{
            url: '/select-destination',
            views:{
                'place-info':{
                    templateUrl: './site/html/views/select-destination.html'
                },
                'fix-plans':{
                    templateUrl:'./site/html/views/fix-plans.html'
                },
                'testimonials':{
                    templateUrl:'./site/html/views/testimonials.html'
                }
            }
        })
        .state('planATrip',{
            url: '/plan-a-trip',
            views:{
                'place-info':{
                    templateUrl: './site/html/views/plan-a-trip.html'
                },
                'planning-steps-view@planATrip':{
                    templateUrl: './site/html/views/add-attractions.html'
                },
                'fix-plans@':{ },
                'testimonials@':{}
            }
        })
        .state('planATrip.proceed',{
            url: '/:planningStage',
            views:{
                'planning-steps-view@planATrip':{
                    templateUrl: function($stateParams){
                        return './site/html/views/'+$stateParams.planningStage+'.html';
                    }
                }
            }
        })
        .state('planATrip.prePlansInfo',{
            url: '/pre-plans/:prePlan',
            views:{
                'planning-steps-view@planATrip':{
                    templateUrl: function($stateParams){
                        return './site/html/views/'+$stateParams.prePlan+'.html';
                    }
                }
            }
        })
        .state('aboutUs',{
            url: '/about-us',
            views:{
                'place-info':{
                    templateUrl: function(){
                        document.title = "About Us @Tourepedia";
                        return './site/html/views/about-us.html';
                    }
                }
            }
        })
        .state('samplePlan',{
            url: '/sample-plan',
            views:{
                'place-info':{
                    templateUrl: function(){
                        document.title = "Sample Plan @Tourepedia";
                        return './site/html/views/sample-plan.html';
                    }
                }
            }
        })
        .state('privacyPolicies',{
            url: '/privacy-policies',
            views:{
                'place-info':{
                    templateUrl: function(){
                        document.title = "Privacy Policies @Tourepedia";
                        return './site/html/views/privacy-policies.html';
                    }
                }
            }
        })
        .state('termConditions',{
            url: '/term-and-conditions',
            views:{
                'place-info':{
                    templateUrl: function(){
                        document.title = "Term & Conditions @Tourepedia";
                        return './site/html/views/terms-and-conditions.html';
                    }
                }
            }
        })
        .state('careers',{
            url:'/careers',
            views:{
                'place-info':{
                    templateUrl:function(){
                     document.title = "Careers @Tourepedia";
                     return './site/html/views/careers.html';
                    }
                }
            }
        })
        .state('campusSpecial', {
          url:'/campus-special',
          views:{
              'place-info':{
                  templateUrl:function(){
                   document.title = "Campus Special @Tourepedia";
                   return './site/html/views/campus.html';
                  }
              },
              'campus-special-options@campusSpecial':{
                  templateUrl:function(){
                   return './site/html/views/campus-special-options.html';
                  }
              },
              'campus-special-places@campusSpecial':{
                  templateUrl:function(){
                   return './site/html/views/campus-special-places.html';
                  }
              }
          }
        })
        .state('campusSpecial.place-info', {
          url:'/place/:id',
          views:{
              'campus-special-options':{},
              'campus-special-places':{
                  templateUrl:function(){
                  document.title = "Campus Special Place Info @Tourepedia";
                   return './site/html/views/campus-special-place-info.html';
                  }
              }
          }
        })
        .state('campusSpecial.book', {
          url:'/:id/book',
          views:{
            'campus-special-options':{},
            'campus-special-places':{
                templateUrl:function(){
                  document.title = "Campus Special Book @Tourepedia";
                  return './site/html/views/campus-special-book.html';
                }
            }
          }
        })
        .state('instaBook', {
          url:'/insta-book',
          views:{
              'place-info':{
                  templateUrl: function(){
                      document.title = "Insta Book @Tourepedia";
                      return './site/html/views/insta-book.html';
                  }
              }
          }
        })
        .state('campusAmbassador', {
          url:'/campus-ambassador',
          views:{
              'place-info':{
                  templateUrl: function(){
                      document.title = "Campus Ambassador @Tourepedia";
                      return './site/html/views/campus-ambassador.html';
                  }
              },
              'fix-plans':{
                  templateUrl:'./site/html/views/fix-plans.html'
              },
              'testimonials':{
                  templateUrl:'./site/html/views/testimonials.html'
              }
          }
        })


}]);


// run at the start
app.run(['$rootScope', function($rootScope){
    $rootScope.$on('$stateChangeStart', function(){
        NProgress.start();
    });
    $rootScope.$on('$stateChangeSuccess', function(){
        NProgress.done();
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    });
}]);

var app = angular.module("tourepedia");


app.directive("myMenu", function(){
    return{
        restrict: 'E',
        templateUrl: './site/html/templates/menu.html'
    };
});

app.directive('myFooter', function(){
    return{
        restrict: 'E',
        templateUrl: './site/html/templates/footer.html'
    };
});
app.directive('myLogin', function(){
    return{
        restrict: 'E',
        templateUrl: './site/html/templates/login.html'
    };
});
app.directive('mySignup', function(){
    return{
        restrict: 'E',
        templateUrl: './site/html/templates/signup.html'
    };
});
app.directive('moveTop', function(){
    return{
        restrict: 'E',
        templateUrl: './shared/html/templates/move-top.html'
    };
});
app.directive('planCosts', function () {
    return{
        restrict: 'E',
        templateUrl: './site/html/templates/plan-costs.html'
    };
});

app.directive('errSrc', function() {
    return {
        link: function(scope, element, attrs) {
            element.bind('error', function() {
                if (attrs.src != attrs.errSrc) {
                    attrs.$set('src', attrs.errSrc);
                }
            });
        }
    };
});

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

var app  = angular.module('tourepedia')
.controller('CareerController', ['$scope','JobApplicationService', function(scope, jobService){

    scope.submittingJobApplication = false;

    scope.availableJobs = [];

    jobService.getJobs().then(function(resp){
        console.log(resp.data);
        scope.availableJobs = resp.data;
    });


    scope.selectedJob  = {};
    scope.applicant = {'gitHub': '', 'linkedin':''};

    scope.setSelectedJob = function(job){
        scope.selectedJob = job;
        scope.applicant.jobTitle = job.title;
    };



    scope.submitJobApplication = function(){
        scope.submittingJobApplication = true;
        jobService.apply(scope.applicant).then(function(resp){
            console.log(resp.data);
            scope.submittingJobApplication = false;
            var data = resp.data;
            if(data.applicationSubmitted){
                alert("Your form successfully submitted. You will  be contacted soon.");
                CloseDialog('job-apply-dialog');
            }else{
                alert("We are facing some problems while processing request. Please try after sometime.");
            }
        });
    };

}]);

var app  = angular.module('tourepedia')
.controller('HomeViewController', ['$scope','$interval', function(scope, interval){
    scope.firstTime = true;
    var imagesName = ['1.jpg',
        '2.jpg',
        '3.jpg',
        '4.jpg',
        '6.jpg',
        'tulip garden kashmir.jpg'
    ];
    var i = 0;
    var numOfImages = imagesName.length;
    scope.image1 = imagesName[i];
    i++;
    scope.image2 = imagesName[i];
    interval(UpdateImage, 5000);

    var updatingImage1 = true;

    function UpdateImage(){
        scope.firstTime = false;

        /*
        * we will alter the update of images for both image1 and image2
        * like first update image1, then image2, then image 1, then image 2...*/

        i++;
        if(i >= numOfImages){i=0;}
        if(updatingImage1)
            scope.image1 = imagesName[i];
        else
            scope.image2 = imagesName[i];
        updatingImage1 = !updatingImage1;
    }

    scope.$on('Destroy', function(){console.log("I am destroyed");});

}]);

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

var app = angular.module('tourepedia')
.controller('LoginController', ['$scope', 'LoginSignUpService', '$rootScope','SessionService',
    function ($scope, LoginService, $rootScope, SessionService) {
        $scope.login = function (user) {
            if (!$rootScope.isLoggedIn) {
                loginInProgress = true;
                var $promise = LoginService.login(user);
                $promise.then( function (resp) {
                    loginInProgress = false;
                    var data = resp.data;
                    if(data.loginStatus == "login failure"){
                        showNotification("email-password combination don't match", "red", "4");
                    }else if(data.loginStatus == "success"){
                        $rootScope.isLoggedIn = true;
                        showNotification('Login Success.', "green", "2");
                        CloseDialog('login-dialog');
                        SessionService.set('userId', data.userEmail);
                    }
                });
            }else{
                console.log("user already logged in");
                CloseDialog('login-dialog');
            }
        };
    }]);

var app = angular.module('tourepedia')
.controller("MenuLocationPlacesController", ["$scope", "PlacesService", "$rootScope","SessionService","LoginSignUpService","Auth",
    function (scope, placeService, rootScope, SessionService, loginServices, auth) {
        scope.places = [];
        var $promise = placeService.placeInfo();
        $promise.then(function (resp) {
            scope.places = resp.data.places_data;
        });
        scope.updatePlaceInfo = function (placeId) {
            $promise = placeService.placeDataForPlace(placeId);
            $promise.then(function (resp) {
                rootScope.selectedPlaceInfo = resp.data.places_data[0];
            });
            SessionService.set('user', JSON.stringify({"attractionsList":[], "plan":{},"book":{}}));
        };

        scope.login = function(){
            auth.login(false);
        }

        scope.register = function(){
            auth.register(false);
        }

        scope.logout = function(){
            loginServices.logout();
            rootScope.isLoggedIn = false;
        };
        rootScope.isLoggedIn = SessionService.hasKey('userId');
    }
]);

var app = angular.module('tourepedia')
.controller("PlaceInfoController", ['$scope', '$rootScope', '$location', 'SessionService', 'PlacesService',
    function (scope, rootScope, location, SessionService, PlacesService) {
        scope.selectedPlaceInfo = {};
        scope.images = {
            "Himachal Pardesh" : "1.jpg",
            "North East" : "4.jpg",
            "Rajasthan" : "33.jpg",
            "Uttrakhand"  : "tulip garden kashmir.jpg",
            "Others" : "6.jpg",
            "Goa": "Beach.jpg"
        };

        scope.isPlaceSelected = rootScope.selectedPlaceInfo !== undefined;
        rootScope.$watch('selectedPlaceInfo', function (newValue) {
            scope.selectedPlaceInfo = newValue;
            if (newValue !== undefined) {
                scope.isPlaceSelected = true;
                SessionService.set('selectedPlaceId', newValue.id);
            }
        });


        scope.processToAddAttraction = function () {
            SessionService.set('userProceedToAddAttraction', true);
        };
        // check for users refresh so that he cannot come to it before selecting any place
        if (!SessionService.hasKey('selectedPlaceId')) {
            location.path('/home');
        } else {
            var $promise = PlacesService.placeDataForPlace(SessionService.get('selectedPlaceId'));
            $promise.then(function (resp) {
                if (!scope.isPlaceSelected)
                    scope.selectedPlaceInfo = resp.data.places_data[0];
            });
        }

    }]);

var app = angular.module('tourepedia')
.controller('SignUpController', ['$scope', 'LoginSignUpService','$rootScope','SessionService',
    function ($scope, SignUpService, rootScope, SessionService) {

        $scope.newUser = {};
        $scope.everyThingAlright = function (newValue) {
            var validName = (newValue.fullName !== undefined && newValue.fullName !== '');
            var validMobileNumber = (newValue.mobileNumber !== undefined && newValue.mobileNumber !== '');
            var validEmail = (newValue.email !== undefined && newValue.email !== '');
            var validPassword = (newValue.password !== undefined && newValue.password !== '');
            var validRePassword = (newValue.rePassword !== undefined && newValue.rePassword !== '');
            var passwordMatch = (validPassword && validRePassword) && (newValue.password == newValue.rePassword);
            return validName && validMobileNumber && validEmail && validPassword && validRePassword && passwordMatch;
        };
        $scope.registerUser = function (newUser) {
            console.log(newUser);
            signUpInProgress = true;
            var $promise = SignUpService.signUp(newUser);
            $promise.then( function(resp){
                signUpInProgress = false;
                var data = resp.data;
                console.log(data);
                if(data.registerStatus == "already registered"){
                    showNotification('Email already exists. Please choose a different email address to signup.', "red", "5");
                }else if(data.registerStatus == "successfully registered"){
                    showNotification('Registration complete.', "skyblue", "2");
                    CloseDialog('signUp-dialog');
                    rootScope.isLoggedIn = true;
                    SessionService.set('userId', data.userEmail);
                }
            });
        };
    }]);

/**
 * Created by Sudhir on 17-Jun-15.
 */


app.controller("TripPlanningController", ['$scope', '$location', 'AttractionService', 'PlacesService', 'SessionService','$rootScope','OurPlansService','$state','$stateParams','SubmitPlanService',
    function (scope, location, AttractionService, PlacesService, SessionService, rootScope, ourPlanService, $state, $stateParams, SubmitPlanService) {

        // this controller takes care of selecting attractions, taking user's personal information
        // and submitting tha plan

        scope.user = {};
        scope.user.attractionsList = [];

        scope.user.plan = {};
        scope.user.book = {};
        scope.user.planType = 'Book';
        scope.user.plan.priceToPay = "";
        var hotelTypes = ["Budget","Deluxe","Super Deluxe", "Luxury"];
        var amenities = ["Air Conditioning", "Laundry Services","Swimming Pool", "Internet/Wifi", "Parking", "Restaurant", "Taxi & Tourism", "Bar", "Others"];
        if (SessionService.hasKey('user')) {
            scope.user = JSON.parse(SessionService.get('user'));
        }
        scope.numOfDays = ['1-3', '4-6', '6+'];

        scope.trainOptions = ['Sleeper', '3rd AC / Chair Car', '1st AC / 2nd AC'];
        scope.flightOptions = ['Economy Class', 'Business Class'];
        scope.otherOptions = ['Bus', 'Self Driven Car', 'Cab'];
        scope.expectedBudgetPerPerson = ['4000 - 6000', '6000 - 8000', '8000-10000','10000-12000','12000-15000','15000+'];

        scope.typeOfTrips = ["Family", "Friends Group", "Honey Moon", "Holidays"];
        scope.prices = [300, 500, 1000];
        scope.days = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
        scope.years = [2015,2016,2017];
        scope.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        var toDay = new Date();
        scope.user.startingDateDay = toDay.getDate();
        scope.user.startingDateMonth = toDay.toLocaleString('en-US',{month:'long'});
        scope.user.startingDateYear = toDay.getFullYear();

        scope.userAtAddAttraction = false;
        scope.userAtAddInformation = false;
        scope.userAtSubmitPlan = false;
        scope.selectedPlaceInfo = {};

        // all hotel preferences
        scope.allHotels = [
            "Budget","Deluxe","Super Deluxe", "Luxury"
        ];

        // all amenities preferences
        scope.allAmenities = [
            "Air Conditioning", "Laundry Service", "Swimming Pool","Internet/Wifi",
            "Parking", "Restaurant","Taxi & Tourism","Bar"
        ];

        // to check for at-least one checkbox selected
        scope.anyCheckboxSelected = function (object) {
            if(object)
                return Object.keys(object).some(function (key) {
                    return object[key];
                });
            return false;
        };

        var currStartingAttractionsIndex = 0;
        var attractionsForView = 8;
        scope.showPre = false;
        scope.showNext = false;
        scope.updatePrice = function(numOfPeople) {
            scope.user.plan.priceToPay = scope.prices[scope.numOfDays.indexOf(numOfPeople)];
        };

        if (SessionService.hasKey('selectedPlaceId')) {
            var $promise;
            $promise = ourPlanService.ourPlansForPlace(SessionService.get('selectedPlaceId'));
            $promise.then( function(resp){
                scope.ourPlansForThisPlace  = resp.data.our_trips;
            });
            $promise = PlacesService.placeDataForPlace(SessionService.get('selectedPlaceId'));
            $promise.then(function (resp) {
                scope.selectedPlaceInfo = resp.data.places_data[0];
            });
            if (SessionService.hasKey('userProceedToAddAttraction')) {
                $promise = AttractionService.getAttractionFor(SessionService.get('selectedPlaceId'));
                $promise.then(function (resp) {
                    scope.attractions = resp.data.attractions;
                    var alreadySelectedAttractions = JSON.parse(SessionService.get('user')).attractionsList;
                    for (var i = 0; i < alreadySelectedAttractions.length; i++) {
                        for (var y = 0; y < scope.attractions.length; y++) {
                            if (alreadySelectedAttractions[i].id == scope.attractions[y].id) {
                                scope.attractions.splice(y, 1);
                            }
                        }
                    }

                    scope.visibleAttractions = [];
                    if(scope.attractions.length > attractionsForView){
                        scope.visibleAttractions = scope.attractions.slice(currStartingAttractionsIndex, attractionsForView);
                        scope.showNext = true;
                    }else{
                        scope.visibleAttractions = scope.attractions.slice(0, scope.attractions.length);
                    }
                });
                if (location.$$path.split('/')[1] == 'plan-a-trip') {
                    switch (location.$$path.split('/')[2]) {
                        case undefined :
                            scope.userAtAddAttraction = true;
                            break;
                        case "pre-plans":
                            if(SessionService.hasKey("selectedPlanId")){
                                $promise = ourPlanService.ourPlanData(SessionService.get('selectedPlanId'));
                                $promise.then(function(resp){
                                    scope.ourPlanCurrent =  resp.data.our_trips_data[0];
                                });
                                scope.userAtAddAttraction = true;
                            }else{
                                location.path('/plan-a-trip');
                            }

                            break;
                        case  "personal-information":
                            scope.user.planType = "Book";
                            scope.userAtAddInformation = true;
                            break;
                        case "view-and-pay":
                            scope.user.planType = "Plan";
                            scope.userAtSubmitPlan = true;
                            break;
                        case "view-and-submit":
                            scope.user.planType = "Book";
                            scope.userAtSubmitPlan = true;
                            break;
                        default :
                            //user has typed something. smart. send him back to home
                            location.path('/home');
                            break;
                    }
                } else {
                    location.path('/plan-a-trip');
                }
            } else {
                location.path('/home');
            }
        } else {
            console.log("I am going to home");
            location.path('/home');
        }


        scope.nextAttractionsList = function(){
            currStartingAttractionsIndex += attractionsForView;
            if(scope.attractions.length-1 >= currStartingAttractionsIndex+attractionsForView){
                scope.visibleAttractions = scope.attractions.slice(currStartingAttractionsIndex, currStartingAttractionsIndex+8);
            }else{
                scope.visibleAttractions =scope.attractions.slice(currStartingAttractionsIndex, scope.attractions.length);
                scope.showNext = false;
            }
            scope.showPre = true;
        };

        scope.preAttractionsList = function(){
            currStartingAttractionsIndex -= attractionsForView;
            scope.visibleAttractions = scope.attractions.slice(currStartingAttractionsIndex, currStartingAttractionsIndex+attractionsForView);
            scope.showNext = true;
            if(currStartingAttractionsIndex === 0){
                scope.showPre = false;
            }
        };

        // users proceeded to add his personal information
        scope.proceedToAddPersonalInformation = function (attraction) {
            console.log(attraction);
            SessionService.destroy("selectedPlanId");
            scope.user.ourPlanId = -1;
            scope.userAtAddAttraction = false;
            scope.userAtAddInformation = true;
            scope.userAtSubmitPlan = false;
        };

        // user is asking to submit the plan
        scope.proceedToSubmitThePlan = function (userPersonalInfo, isValid) {
            if (isValid) {
console.log(JSON.stringify(scope.user));
                scope.userAtAddAttraction = false;
                scope.userAtAddInformation = false;
                scope.userAtSubmitPlan = true;
                var i;
                if (scope.user.book !== undefined) {
                    var tmp = [];
                    if (userPersonalInfo.hotelPref !== undefined) {
                        for ( i = 0; i < hotelTypes.length; i++) {
                            if (userPersonalInfo.hotelPref[i] !== undefined && userPersonalInfo.hotelPref.i !== false) {
                                tmp.push(hotelTypes[i]);
                            }
                        }
                    }
                    scope.user.book.hotels = tmp.toString();
                    tmp = [];
                    if (userPersonalInfo.amenitiesPref !== undefined) {
                        for (i = 0; i < amenities.length; i++) {
                            if (userPersonalInfo.amenitiesPref[i] !== undefined && userPersonalInfo.amenitiesPref.i !== false) {
                                tmp.push(amenities[i]);
                            }
                        }
                    }
                    if (scope.user.book.travelPref != 'No Preference') {
                        scope.user.book.travel = scope.user.book.travelPref + ", " + scope.user.book.travelBy;
                    } else {
                        scope.user.book.travel = 'No Preference';
                    }
                    scope.user.book.amenities = tmp.toString();
                }
                scope.user.selectedPlace = scope.selectedPlaceInfo.place_name + ", " + scope.selectedPlaceInfo.place_region_name;
                scope.user.journeyStartingDate = scope.user.startingDateMonth + " " + scope.user.startingDateDay + ", " + scope.user.startingDateYear;
                scope.user.selectedPlaceId = scope.selectedPlaceInfo.id;
                SessionService.set('user', JSON.stringify(scope.user));
                if(scope.user.planType == 'Plan'){
                    $stateParams.planningStage = 'view-and-pay';


                }else if(scope.user.planType == 'Book'){
                    $stateParams.planningStage = 'view-and-submit';

                }
$state.go("planATrip.proceed");

            }else{
                alert("Please fill the information correctly.");
            }
        };

        scope.submitThePlan = function () {
            scope.isProgressGoing = true;
            var typeofPlan = scope.user.planType;
            if(SessionService.hasKey('selectedPlanId'))
                scope.user.ourPlanId = SessionService.get('selectedPlanId');
            else
                scope.user.ourPlanId = -1;
            console.log(scope.user.ourPlanId);
            var $promise = SubmitPlanService.submitPlan(scope.user);
            $promise.then( function(resp) {
                scope.isProgressGoing = false;
                console.log(resp.data);
                showNotification("Plan successfully submitted.", "rgb(26, 188, 156)", 4);
                SessionService.destroy('selectedPlaceId');
                SessionService.destroy('userProceedToAddAttraction');
                SessionService.destroy('user');
                SessionService.destroy("selectedPlanId");
                console.log(typeofPlan);
                if(typeofPlan == 'Book')
                 location.path('/home');
            });

        };

        // function to add use selected attraction to user attraction list
        scope.addAttractionToList = function (attraction) {
            scope.visibleAttractions.splice(scope.visibleAttractions.indexOf(attraction), 1);
            scope.attractions.splice(scope.attractions.indexOf(attraction), 1);
            if(scope.attractions.length >= currStartingAttractionsIndex + attractionsForView){
                // means there are still some attraction left on right side
                scope.visibleAttractions.push(scope.attractions[currStartingAttractionsIndex+attractionsForView-1]);
            }
            if(scope.attractions.length <= currStartingAttractionsIndex + attractionsForView){
                scope.showNext = false;
            }
            scope.user.attractionsList.push(attraction);
            SessionService.set('user', JSON.stringify(scope.user));
            showNotification("Attraction added to list.", "rgb(52, 73, 94)", 2);
        };

        // function to remove attraction from users list
        scope.removeAttractionFromList = function (attraction) {
            scope.user.attractionsList.splice(scope.user.attractionsList.indexOf(attraction), 1);
            scope.attractions.push(attraction);
            if(scope.visibleAttractions.length < attractionsForView){
                scope.visibleAttractions.push(attraction);
            }
            if(scope.attractions.length > currStartingAttractionsIndex + attractionsForView){
                scope.showNext = true;
            }


            SessionService.set('user', JSON.stringify(scope.user));
            showNotification("Attraction removed from list.", "rgb(231, 76, 60)", 1);
        };


        // proceed to view a our-plan for the current place
        scope.showOurPlan = function(ourPlanId){
            SessionService.set('selectedPlanId', ourPlanId);
            var $promise = ourPlanService.ourPlanData(ourPlanId);
            $promise.then(function(resp){
                scope.ourPlanCurrent =  resp.data.our_trips_data[0];
            });
        };

        scope.proceedToAddOurPlan = function(ourPlanId){
            SessionService.set('selectedPlanId', ourPlanId);
            scope.user.attractionsList = [];
            scope.userAtAddAttraction = false;
            scope.userAtAddInformation = true;
            scope.userAtSubmitPlan = false;
        };

        scope.setSelectedPlaceInfo = function(attraction){
            scope.selectedAttractionInfo  = attraction;
        };

    }]);

var app = angular.module("tourepedia");

// filter for our user application
app.filter('PlaceTypeFilter', function(){
    return function(input, placeTypeFilter){
        var filteredArray = [];
        if(placeTypeFilter.length === 0)
            return input;
        else{
            for(var i=0; i < input.length; i++){
                if(placeTypeFilter.indexOf(input[i].type) != -1){
                    filteredArray.push(input[i]);
                }
            }

        }
        return filteredArray;
    };
});
app.filter('PlacePopularityFilter', function(){
    return function(input, placePopularityFilter){
        var filteredArray = [];
        if(placePopularityFilter.length === 0)
            return input;
        else{
            for(var i=0; i < input.length; i++){
                if(placePopularityFilter.indexOf(input[i].popularity) != -1){
                    filteredArray.push(input[i]);
                }
            }

        }
        return filteredArray;
    };
});


app.filter('OfferFilter', function () {
   return function(input, offerFilter){
    var filteredArray = [];
    if(offerFilter.length == 0 || offerFilter[0] == false)
        return input
    else{
        for(var i = 0; i < input.length; i++){
            if(input[i].discountedPrice != ''){
                filteredArray.push(input[i]);
            }
        }
    }
    return filteredArray;
   };
});

var app = angular.module('tourepedia')
.factory('AmbassadorServices', ['$http','apiRoot', function(http, apiRoot){
    return{
        apply: function(applicant){
            return http.post(apiRoot+'ambassador.php/submit', applicant);
        }
    };
}]);

var app = angular.module('tourepedia')
.factory('LoginSignUpService', ['$http', 'SessionService','apiRoot', function ($http, SessionService, apiRoot) {
    return {
        login: function (user) {
            var data = {
                email: user.email,
                pwd: user.password
            };
            return $http.post(apiRoot+'slim.php/auth/process', data);
        },
        logout: function () {
            SessionService.destroy('userId');
            return $http.get(apiRoot+'slim.php/auth/logout');
        },
        isLoggedIn: function () {
            return $http.post(apiRoot+'slim.php/auth/isLoggedIn');
        },
        signUp: function (newUser) {
            var data = {
                'email': newUser.email,
                'pwd': newUser.password,
                'fullName': newUser.fullName,
                'mobileNumber': newUser.mobileNumber
            };
            return $http.post(apiRoot+'slim.php/register', data);
        }
    };
}]);

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

var app = angular.module("tourepedia")

.constant("apiRoot", "http://localhost/tp/1.1/app/api/");

var app = angular.module('tourepedia')
.factory('InstaBookService', ["$http", "apiRoot", function(http, apiRoot){
  return{
    submit: function(user){
      console.log(user);
      return http.post(apiRoot+"insta-book.php/submit", user);
    }
  }
}]);

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

var app = angular.module('tourepedia')
.factory('SessionService', [function () {
    return {
        set: function (key, value) {
            return sessionStorage.setItem(key, value);
        },
        get: function (key) {
            return sessionStorage.getItem(key);
        },
        destroy: function (key) {
            return sessionStorage.removeItem(key);
        },
        hasKey: function (key) {
            return sessionStorage.getItem(key) != undefined;
        }
    };
}]);

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

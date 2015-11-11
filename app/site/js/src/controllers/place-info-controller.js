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

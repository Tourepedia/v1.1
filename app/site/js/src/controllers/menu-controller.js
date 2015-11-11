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

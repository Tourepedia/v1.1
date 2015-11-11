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

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

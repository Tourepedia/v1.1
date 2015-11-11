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

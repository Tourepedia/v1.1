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

(function(){
	angular.module('tourepedia.shared')
	.directive('tpAuthModal', ['Auth', 'Modals','$rootScope','$http', 'apiRoot', function(auth, modal, rootScope, http, apiRoot){
		return{
			restrict: "E",
			templateUrl: function(elem, attr){
				return attr.dir+'/html/templates/tp-auth-modal.html'
			},
			link: function(scope, element, attrs){
				// define variable 
				scope.user = {}; // variable for user who logs in
		    scope.newUser  = {}; // variable for registration 

		    scope.login = login;
		    scope.register = register;

		    rootScope.$on("auth.login", function(event, author){
		    	scope.purpose = 'login';
		    	scope.author = author;
		    	modal.open("auth-modal");
			    scope.registrationSuccess = false;	
		    });

		    rootScope.$on("auth.register", function(event, author){
		    	scope.purpose = 'register';
		    	scope.author = author;
		    	modal.open("auth-modal");
		    	scope.registrationSuccess = false;
		    })

    		// login functionality
		    function login(){
		      var data = scope.user;
		      http.post(apiRoot+'/users/index.php/login', data).then(function(resp){
		        var data = resp.data;
		        if (data.success) {
		          modal.close("auth-modal");
		          rootScope.isLoggedIn = true;
		          rootScope.$emmit('loggedIn');
		        }else{
		          scope.loginError = data.error;
		        }
		      });
		    };

		    // registration functionality
		    function register(){
		      var data = scope.newUser;
		      data.isAuthor = undefined;
		      if(data.urls != undefined){
		        data.urls = JSON.stringify(data.urls);
		      }
		      http.post(apiRoot+'/users/index.php/register', data).then(function(resp){
		        data = resp.data;
		        if(data.success){
		          scope.registrationSuccess = true;
		        }else{
		          scope.registrationError = data.error;
		        }
		      });
		    };

			}
		}
	}])
})();
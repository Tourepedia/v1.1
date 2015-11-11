var app = angular.module('tourepedia.shared', [])
.constant('apiRoot', 'http://localhost/tp/1.1/app/api');

/**
 * Created by Sudhir on 20-Jun-15.
 */

function MoveMyLabel(inputGroup){
    var label = _id(inputGroup[1]);
    label.classList.add('move-label');
}

function ResetLabel(inputGroup){
    var input = _id(inputGroup[0]);
    if(input.value == ""){
        var label = _id(inputGroup[1]);
        label.classList.remove('move-label');
    }
}

function LaunchDialog(idName){
    document.body.style.overflow = "hidden";
    var dialog = _id(idName);
    dialog.style.display = "flex";
    dialog.style.display = "-webkit-flex";
    dialog.style.display = "-ms-flexbox";

}

function CloseDialog(idName){
    document.body.style.overflow = "auto";
    var dialog = _id(idName);
    dialog.style.display = "none";
}



function ScrollToTop(){
    window.scrollTo(0,0);
}

/* bookkeeping stuff */
function _id(idName){
    return document.getElementById(idName);
}

window.onload = setUpFunction;
var notification;
function setUpFunction() {
    notification = document.getElementById("notification");
}
var notificationId;
function showNotification(notificationString, backgroundColor, duration) {
    notification.innerHTML = notificationString;
    notification.style.background = backgroundColor;
    notification.style.webkitAnimationDuration = duration.toString()+"s";
    notification.style.mozAnimationDuration = duration.toString()+"s";
    notification.style.msAnimationDuration = duration.toString()+"s";
    notification.style.animationDuration = duration.toString()+"s";
    notification.classList.add('play-animation');
    notificationId = setInterval(hideNotification, duration*1000);
}

function hideNotification(){
    notification.classList.remove('play-animation');
    clearInterval(notificationId);
}

(function(){
  angular.module('tourepedia.shared')
  .directive('inputVal', function(){
    return{
      link: function(scope, element, attributes){
        element.on(
            "focus",
            function handleFocusEvent( event ) {
                element.parent().addClass('focused');
            }
        );
        element.on(
            "blur",
            function handleFocusEvent( event ) {
              if(element.val() != ''){
                element.parent().addClass('has-value');
              }else{
                element.parent().removeClass('has-value');
              }
              element.parent().removeClass('focused');
            }
        );
      }
    };
  })
})();

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
(function(){
  angular.module('tourepedia.shared')
  .directive('tpModal', ['$rootScope', 'Modals' ,function(rootScope, modals){
    return{
      link: function( scope, element, attributes ) {
        scope.modalId = attributes.id;
        element.on(
            "click",
            function handleClickEvent( event ) {
                // check for window to be the target of the click event
                if (element[0].childNodes[1] !== event.target ) {
                    return;
                }
                scope.$apply( modals.close(scope.modalId) );
            }
        );
        scope.closeModal = function(){
          modals.close(scope.modalId);
        };
        // Listen for "open" events emitted by the modals service object.
        rootScope.$on(
            "modals.open",
            function handleModalOpenEvent( event, modalId ) {
                if(scope.modalId == modalId){
                  element.addClass('active');
                  document.body.style.overflow = "hidden";
                }
            }
        );
        // Listen for "close" events emitted by the modals service object.
        rootScope.$on(
            "modals.close",
            function handleModalCloseEvent( event, modalId ) {

              if(scope.modalId == modalId){
                element.removeClass('active');
                document.body.style.overflow = "auto";
              }
            }
        );
      }
    };
  }])
})();

(function(){
	angular.module('tourepedia.shared')
	.directive('tpMoveTop', ['$window', function(window){
		return{
			restrict: "E",
			templateUrl: function(elem, attr){
      	return attr.dir+'/html/templates/tp-move-top.html';
    	},
			link: function(scope, element, attrs){
				element.addClass('move-top-button');
				window.addEventListener("scroll", function(){
					wScroll  = window.pageYOffset;
	        if(wScroll > screen.height ){
            if(!element.hasClass("show")){
            	element.addClass("show");
            }
	        }else{
            if(element.hasClass("show")){
            	element.removeClass("show");
            }
	        }
				});

				element.on("click",function(){
					window.scrollTo(0,0);
				});
			}
		}
	}])
})();
(function(){
	angular.module('tourepedia.shared')
	.directive('tpNotification', ['$rootScope', function(rootScope){
		return{
			restrict: "E",
			templateUrl: function(elem, attr){
				return attr.dir+'/html/templates/tp-notification.html'
			},
			link: function(scope, element, attrs){
				scope.message = "";
				
				rootScope.$on("notification.show", function(event, message){
					scope.message = message;
					element.addClass('show');
				});
				
				element.on("click",function(){
					element.removeClass('show');
				});
			}
		}
	}])
})();
(function(){
	angular.module('tourepedia.shared')
  .service("Auth", ['$rootScope','$http', 'apiRoot', function(rootScope, http, apiRoot){
    return{
      login: function(author){
        rootScope.$emit('auth.login', author);
        return ;
      },
      register: function(author){
        rootScope.$emit('auth.register', author);
        return ;
      },
      loggedIn: function(){
        return http.get(apiRoot+'/users/index.php/loggedIn');
      },
      logout: function(){
        return http.get(apiRoot+'/users/index.php/logout');
      }
    }
  }])
})();
(function(){
	angular.module('tourepedia.shared')
	.service("Modals",['$rootScope', '$q' , function(rootScope, q){
      // represent the currently active modal window instance.
      var modal = {
          id: null
      };
      // Return the public API.
      return({
          open: open,
          close: close
      });
      function open( id ){
          modal.id = id;
          rootScope.$emit( "modals.open", id );
          return ;
      }

      function close( id ) {
          // Tell the modal directive to close the active modal window.
          rootScope.$emit( "modals.close", id );
          return ;
      }
  }])
})();
(function(){
	angular.module('tourepedia.shared')
	.service('Notification', ["$rootScope", function(rootScope){
    return{
      show: function(message){
        rootScope.$emit("notification.show", message);
        return ;
      }
    }
  }])
})();
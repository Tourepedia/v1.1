var blogApp = angular.module('tourepedia.blog', ['ui.router', 'tourepedia.shared'])
// .constant('apiRoot', 'http://localhost/tp/1.1/app/api')
.run(["$rootScope","Auth", function(rootScope, auth){
	rootScope.$on("$stateChangeSuccess", function(event, toState, toParams, fromState, fromParams){
		auth.loggedIn().then(function(resp){
			console.log(resp.data);
			rootScope.loggedIn = resp.data.loggedInStatus;
		})
	})
}]);



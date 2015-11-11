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
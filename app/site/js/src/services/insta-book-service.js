var app = angular.module('tourepedia')
.factory('InstaBookService', ["$http", "apiRoot", function(http, apiRoot){
  return{
    submit: function(user){
      console.log(user);
      return http.post(apiRoot+"insta-book.php/submit", user);
    }
  }
}]);

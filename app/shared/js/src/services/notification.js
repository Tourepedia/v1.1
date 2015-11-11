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
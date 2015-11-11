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
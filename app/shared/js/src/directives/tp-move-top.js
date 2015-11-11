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
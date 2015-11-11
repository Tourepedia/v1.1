(function(){
  angular.module('tourepedia.blog')
  .directive('slider',['$timeout', function($timeout) {
    return {
      restrict: 'AE',
      replace: true,
      scope: {
        items: '='
      },
      link: function(scope, elem, attrs) {
        var unwatch = scope.$watch('items', function(newVal, oldVal){
          // or $watchCollection if items is an array
          if (newVal && newVal.length != 0) {
            init();
            // remove the watcher
            unwatch();
          }
        });

        

        scope.currentIndex = 0; // Initially the index is at the first item
        scope.next = function() {
          scope.currentIndex < scope.items.length - 1 ? scope.currentIndex++ : scope.currentIndex = 0;
        };

        scope.prev = function() {
          scope.currentIndex > 0 ? scope.currentIndex-- : scope.currentIndex = scope.items.length - 1;
        };
        
        var timer;

        function sliderFunc() {
          timer = $timeout(function() {
            scope.next();
            timer = $timeout(sliderFunc, 5000);
          }, 5000);
        };

        sliderFunc();

        scope.$on('$destroy', function() {
          $timeout.cancel(timer);  // when the scope is getting destroyed, cancel the timer
        });

        function init(){
          scope.$watch('currentIndex', function(newVal, oldVal) {
            scope.items.forEach(function(item) {
              item.visible = false; // make every image invisible
            });
            scope.items[newVal].visible = true; // make the current image visible
          });
        };
      },
      
      templateUrl: './html/templates/blog-slider.html'
    };
  }])
})();

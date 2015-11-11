(function(){
  angular.module('tourepedia.blog')
  .directive('blogInfo',[function() {
    return {
      restrict: 'AE',
      replace: true,
      scope: {
        blog: '='
      }, 
      templateUrl: './html/templates/blog-info.html'
    };
  }])
})();

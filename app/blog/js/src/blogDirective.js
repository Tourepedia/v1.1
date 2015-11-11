(function(){
  angular.module('tourepedia.blog')
  .directive('blogMenu', function(){
    return{
      restrict: 'E',
      templateUrl: './html/templates/menu.html'
    }
  })
  .directive('blogFooter', function(){
    return{
      restrict: 'E',
      templateUrl: './html/templates/footer.html'
    }
  })
  .directive('aboutTourepedia', function(){
    return{
      restrict: 'E',
      templateUrl: './html/templates/about-tourepedia.html'
    }
  })
})();

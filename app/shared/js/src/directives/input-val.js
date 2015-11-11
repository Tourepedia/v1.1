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

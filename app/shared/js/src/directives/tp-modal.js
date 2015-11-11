(function(){
  angular.module('tourepedia.shared')
  .directive('tpModal', ['$rootScope', 'Modals' ,function(rootScope, modals){
    return{
      link: function( scope, element, attributes ) {
        scope.modalId = attributes.id;
        element.on(
            "click",
            function handleClickEvent( event ) {
                // check for window to be the target of the click event
                if (element[0].childNodes[1] !== event.target ) {
                    return;
                }
                scope.$apply( modals.close(scope.modalId) );
            }
        );
        scope.closeModal = function(){
          modals.close(scope.modalId);
        };
        // Listen for "open" events emitted by the modals service object.
        rootScope.$on(
            "modals.open",
            function handleModalOpenEvent( event, modalId ) {
                if(scope.modalId == modalId){
                  element.addClass('active');
                  document.body.style.overflow = "hidden";
                }
            }
        );
        // Listen for "close" events emitted by the modals service object.
        rootScope.$on(
            "modals.close",
            function handleModalCloseEvent( event, modalId ) {

              if(scope.modalId == modalId){
                element.removeClass('active');
                document.body.style.overflow = "auto";
              }
            }
        );
      }
    };
  }])
})();

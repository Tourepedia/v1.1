(function(){
	angular.module('tourepedia.shared')
	.service("Modals",['$rootScope', '$q' , function(rootScope, q){
      // represent the currently active modal window instance.
      var modal = {
          id: null
      };
      // Return the public API.
      return({
          open: open,
          close: close
      });
      function open( id ){
          modal.id = id;
          rootScope.$emit( "modals.open", id );
          return ;
      }

      function close( id ) {
          // Tell the modal directive to close the active modal window.
          rootScope.$emit( "modals.close", id );
          return ;
      }
  }])
})();
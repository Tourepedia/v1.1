(function(){
  angular.module('tourepedia.blog')
  .factory('Blogs', ['$http', 'apiRoot', function(http, apiRoot){
    return{
      main: function(){
        return http.get(apiRoot+'/blogs.php/main')
      },
      trending: function(){
        return http.get(apiRoot+'/blogs.php/trending')
      },
      blog: function(blogId){
        return http.get(apiRoot+'/blogs.php/blogs/'+blogId)
      },
      filteredBy: function(filters){
        return http.get(apiRoot+'/blogs.php/blogs?'+filters)
      },
      search: function(filters){
        return http.get(apiRoot+'/blogs.php/search?'+filters)
      }
    }
  }])
  .factory('Authors', ['$http', 'apiRoot', function(http, apiRoot){
    return{
      author: function(authorId){
        return http.get(apiRoot+'/authors.php/authors/'+authorId)
      },
      blogs: function(authorId){
        return http.get(apiRoot+'/blogs.php/blogs?authorId='+authorId)
      }
    }
  }])


  // .service("Auth", ['$http','apiRoot', function(http, apiRoot){
  //   return{
  //     login: function(data){
  //       return http.post(apiRoot+'/users/index.php/login', data)
  //     },
  //     register: function(data){
  //       return http.post(apiRoot+'/users/index.php/register', data);
  //     },
  //     loggedIn: function(){
  //       return http.get(apiRoot+'/users/index.php/loggedIn');
  //     }
  //   }
  // }])

  .service("Account", ['$http', 'apiRoot', function(http, apiRoot){
    return{
      data: function(userId){
        return http.get(apiRoot+'/users/index.php/data/'+userId);
      },
      update: function(userId, data){
        return http.put(apiRoot+'/users/index.php/update/'+userId, data);
      }
    }
  }])

  // .service("modals",['$rootScope', '$q' , function(rootScope, q){
  //     // represent the currently active modal window instance.
  //     var modal = {
  //         id: null
  //     };
  //     // Return the public API.
  //     return({
  //         open: open,
  //         close: close
  //     });
  //     function open( id ){
  //         modal.id = id;
  //         rootScope.$emit( "modals.open", id );
  //         return ;
  //     }

  //     function close( id ) {
  //         // Tell the modal directive to close the active modal window.
  //         rootScope.$emit( "modals.close", id );
  //         return ;
  //     }
  // }])

})();

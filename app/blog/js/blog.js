var blogApp = angular.module('tourepedia.blog', ['ui.router', 'tourepedia.shared'])
// .constant('apiRoot', 'http://localhost/tp/1.1/app/api')
.run(["$rootScope","Auth", function(rootScope, auth){
	rootScope.$on("$stateChangeSuccess", function(event, toState, toParams, fromState, fromParams){
		auth.loggedIn().then(function(resp){
			console.log(resp.data);
			rootScope.loggedIn = resp.data.loggedInStatus;
		})
	})
}]);



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

(function(){
  angular.module('tourepedia.blog')
  .config(['$stateProvider', '$urlRouterProvider',
    function(stateProvider, urlRouterProvider){
      urlRouterProvider.otherwise('/');
      stateProvider
        .state('home', {
          url:'/',
          views:{
            'section-1':{ templateUrl: './html/views/header-blogs.html'},
            'section-2':{templateUrl :'./html/views/more-blogs.html'}
          }
        })
        .state('category',{
          url:'/category/:category',
          views:{
            'section-1':{ },
            'section-2':{templateUrl :'./html/views/category.html'}
          }
        })
        .state('blog',{
          url:'/:blogRecogId',
          views:{
            'section-1':{ templateUrl: './html/views/blog-read.html'},
            'content@blog': {
              templateUrl: function($stateParams){
                return './html/views/blogs/'+$stateParams.blogRecogId+'.html'
              }
            },
            'comments@blog':{ templateUrl: './html/views/blog-read/blog-comments.html' },
            'aside@blog':{ templateUrl: './html/views/blog-read/blog-aside.html' },
            'author@blog':{ templateUrl: './html/views/blog-read/blog-author.html' },
            'section-2':{templateUrl :'./html/views/blog-read/blog-related.html'}
          }
        })
        .state('authors',{
          url:'/authors/:id',
          views:{
            'section-1':{ templateUrl: './html/views/author.html'},
            'section-2':{}
          }
        })
    }])
})();

(function(){
  angular.module('tourepedia.blog')
  .controller('BlogController', ['$scope', '$stateParams','Blogs','Authors', function(scope, stateParams, blogs, authors){

    var recogId = stateParams.blogRecogId;
    scope.blog = {recogId: recogId};

    blogs.blog(recogId).then(function(resp){
      scope.blog = resp.data;
      // fetch related blogs
      tags = resp.data.relatedTagIds;
      blogId = resp.data.id;
      fetchRelated(blogId, tags);

      // fetch author
      authorId = resp.data.authorId;
      author(authorId);
    });

    scope.relatedBlogs = [];

    function fetchRelated(blogId, tags){
      blogs.filteredBy('tags='+tags+'&limit=1'+'&excludeIds='+blogId).then(function(resp){
        scope.relatedBlogs = resp.data;
      });
    }

    scope.author = {};
    function author(authorId){
      authors.author(authorId).then(function(resp){
        scope.author = resp.data;
      });
    }
  }])
  .controller('RelatedBlogsController', ['$scope', 'Blogs', '$stateParams', function(scope, blogs, stateParams){

    scope.relatedBlogs = [];
    scope.moreAvailable = true;
    scope.loadingBlogs = true;

    var offset = 0;
    var limit = 1;
    var recogId = stateParams.blogRecogId;
    var blogId = -1;
    var tags = '';
    blogs.blog(recogId+'/id/relatedTagIds').then(function(resp){
      tags = resp.data.relatedTagIds;
      blogId = resp.data.id;
      fetchRelated(tags, offset, limit);
    });

    function fetchRelated(tags, offset, limit){
      blogs.filteredBy('tags='+tags+'&offset='+offset+'&limit='+limit+'&excludeIds='+blogId).then(function(resp){
        scope.relatedBlogs = scope.relatedBlogs.concat(resp.data);
      });
      isMoreAvailable();
      scope.loadingBlogs = false;
    }

    scope.loadMore = function(){
      if(!scope.loadingMore){
        scope.loadingBlogs = true;
        console.log("loading more..");
        offset += limit;
        fetchRelated(tags, offset, limit);
        isMoreAvailable();
      }else{
        console.log("please wait...");
      }

    }

    function isMoreAvailable(){
      blogs.filteredBy('tags='+tags+'&offset='+(offset+1)+'&limit=1'+'&excludeIds='+blogId).then(function(resp){
        if(resp.data.length != 1){
          scope.moreAvailable = false;
        }
      });
    }

  }])
  .controller('HomeBlogsController',['$scope','Blogs', function(scope, blogs){
    
    var offset = 0;
    var limit = 2;
    scope.mainBlogs = [];
    scope.trending = [];
    scope.moreBlogs = [];
    scope.moreAvailable = true;
    blogs.main().then(function(resp){
      scope.mainBlogs = resp.data;
    });

    blogs.trending().then(function(resp){
      scope.trending = resp.data;
    });

    function fetchMore(){
      blogs.filteredBy('offset='+offset+'&limit='+limit).then(function(resp){
        scope.moreBlogs = scope.moreBlogs.concat(resp.data);
      });
    };

    fetchMore();

    scope.loadMore = function(){
      if(!scope.loadingMore){
        scope.loadingBlogs = true;
        console.log("loading more..");
        offset += limit;
        fetchMore();
        isMoreAvailable();
      }else{
        console.log("please wait...");
      }
    }
    function isMoreAvailable(){
      blogs.filteredBy('offset='+(offset+1)+'&limit=1').then(function(resp){
        if(resp.data.length != 1){
          scope.moreAvailable = false;
        }
      });
    };

  }])
  .controller('CategoryController', ['$scope', '$stateParams', 'Blogs', function(scope, stateParams, blogs){
    var category = stateParams.category;
    var offset = 0;
    var limit = 2;

    scope.blogs = [];
    scope.loadingBlogs = true;
    scope.moreAvailable = true;

    fetchCategory();

    scope.loadMore = function(){
      if(!scope.loadingMore){
        scope.loadingBlogs = true;
        console.log("loading more..");
        offset += limit;
        fetchCategory();
        isMoreAvailable();
      }else{
        console.log("please wait...");
      }
    }
    // console.log(stateParams);

    function fetchCategory(){
      blogs.filteredBy('category='+category+'&offset='+offset+'&limit='+limit).then(function(resp){
        scope.blogs = scope.blogs.concat(resp.data);
      });
      isMoreAvailable();
      scope.loadingBlogs = false;
    }

    function isMoreAvailable(){
      blogs.filteredBy('category='+category+'&offset='+(offset+1)+'&limit=1').then(function(resp){
        if(resp.data.length != 1){
          scope.moreAvailable = false;
        }
      });
    }

  }])
  .controller('AuthorsController',['$scope','Authors','$stateParams', function(scope, authors, stateParams){

    var authorId = stateParams.id;
    scope.author = {id: authorId};

    scope.author.blogs = [];
    authors.author(authorId).then(function(resp){
      if(resp.data.urls){
        resp.data.urls = JSON.parse(resp.data.urls);
      }
      scope.author = resp.data;
    });

    authors.blogs(authorId).then(function(resp){
      scope.author.blogs = resp.data;
    })

  }])
  .controller('MenuController', ['$scope', 'Blogs','Auth', function(scope, blogs, auth){
    scope.blog = {};
    scope.searchResults = [];
    var limit = 4;
    var offset = 0;

    scope.search = function(){
      blogs.search('title='+scope.blog.title+'&offset='+offset+'&limit='+limit).then(function(resp){
        scope.searchResults = resp.data;
      });
    };

    scope.$watch('blog.title', function(n, o){
      if(n == '' || n == undefined){
        scope.searchResults = [];
      }else{
        if(n != o ){
          scope.search();
        }
      }
    });

    scope.removeSearch = function(){
      scope.blog = {};
      scope.searchResults = [];
    };

    scope.launchModal = function(id){
      console.log('launch login');
      auth.login(true);
    };

  }])
  .controller("AccountController", ["$scope", "Account", function(scope, account){

    scope.userData = function(userId){
      account.data(userId).then(function(resp){
          console.log(resp.data);
      })
    };

    scope.updateAccount = function(userId, data){
      account.update(userId, data).then(function(resp){
        console.log(resp.data);
      });
    };




  }])
})();

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

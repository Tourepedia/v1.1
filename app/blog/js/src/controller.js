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

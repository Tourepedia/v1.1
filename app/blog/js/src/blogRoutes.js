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

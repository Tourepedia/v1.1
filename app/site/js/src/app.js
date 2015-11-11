/**
 * Created by Sudhir on 17-Jun-15.
 */
"use strict";
var app = angular.module("tourepedia", ['ui.router', 'tourepedia.shared']);

app.config(['$stateProvider', '$urlRouterProvider',"$locationProvider", function($stateProvider, $urlRouterProvider, locationProvider){
  //  locationProvider.html5Mode({enabled: true, requireBase: false});
    $urlRouterProvider.otherwise('/');
    $stateProvider
        .state('home',{
            url:'/',
            views:{
                'place-info':{
                    templateUrl: './site/html/views/home.html'
                },
                'fix-plans':{
                    templateUrl:'./site/html/views/fix-plans.html'
                },
                'testimonials':{
                    templateUrl:'./site/html/views/testimonials.html'
                }
            }
        })
        .state('selectDestination',{
            url: '/select-destination',
            views:{
                'place-info':{
                    templateUrl: './site/html/views/select-destination.html'
                },
                'fix-plans':{
                    templateUrl:'./site/html/views/fix-plans.html'
                },
                'testimonials':{
                    templateUrl:'./site/html/views/testimonials.html'
                }
            }
        })
        .state('planATrip',{
            url: '/plan-a-trip',
            views:{
                'place-info':{
                    templateUrl: './site/html/views/plan-a-trip.html'
                },
                'planning-steps-view@planATrip':{
                    templateUrl: './site/html/views/add-attractions.html'
                },
                'fix-plans@':{ },
                'testimonials@':{}
            }
        })
        .state('planATrip.proceed',{
            url: '/:planningStage',
            views:{
                'planning-steps-view@planATrip':{
                    templateUrl: function($stateParams){
                        return './site/html/views/'+$stateParams.planningStage+'.html';
                    }
                }
            }
        })
        .state('planATrip.prePlansInfo',{
            url: '/pre-plans/:prePlan',
            views:{
                'planning-steps-view@planATrip':{
                    templateUrl: function($stateParams){
                        return './site/html/views/'+$stateParams.prePlan+'.html';
                    }
                }
            }
        })
        .state('aboutUs',{
            url: '/about-us',
            views:{
                'place-info':{
                    templateUrl: function(){
                        document.title = "About Us @Tourepedia";
                        return './site/html/views/about-us.html';
                    }
                }
            }
        })
        .state('samplePlan',{
            url: '/sample-plan',
            views:{
                'place-info':{
                    templateUrl: function(){
                        document.title = "Sample Plan @Tourepedia";
                        return './site/html/views/sample-plan.html';
                    }
                }
            }
        })
        .state('privacyPolicies',{
            url: '/privacy-policies',
            views:{
                'place-info':{
                    templateUrl: function(){
                        document.title = "Privacy Policies @Tourepedia";
                        return './site/html/views/privacy-policies.html';
                    }
                }
            }
        })
        .state('termConditions',{
            url: '/term-and-conditions',
            views:{
                'place-info':{
                    templateUrl: function(){
                        document.title = "Term & Conditions @Tourepedia";
                        return './site/html/views/terms-and-conditions.html';
                    }
                }
            }
        })
        .state('careers',{
            url:'/careers',
            views:{
                'place-info':{
                    templateUrl:function(){
                     document.title = "Careers @Tourepedia";
                     return './site/html/views/careers.html';
                    }
                }
            }
        })
        .state('campusSpecial', {
          url:'/campus-special',
          views:{
              'place-info':{
                  templateUrl:function(){
                   document.title = "Campus Special @Tourepedia";
                   return './site/html/views/campus.html';
                  }
              },
              'campus-special-options@campusSpecial':{
                  templateUrl:function(){
                   return './site/html/views/campus-special-options.html';
                  }
              },
              'campus-special-places@campusSpecial':{
                  templateUrl:function(){
                   return './site/html/views/campus-special-places.html';
                  }
              }
          }
        })
        .state('campusSpecial.place-info', {
          url:'/place/:id',
          views:{
              'campus-special-options':{},
              'campus-special-places':{
                  templateUrl:function(){
                  document.title = "Campus Special Place Info @Tourepedia";
                   return './site/html/views/campus-special-place-info.html';
                  }
              }
          }
        })
        .state('campusSpecial.book', {
          url:'/:id/book',
          views:{
            'campus-special-options':{},
            'campus-special-places':{
                templateUrl:function(){
                  document.title = "Campus Special Book @Tourepedia";
                  return './site/html/views/campus-special-book.html';
                }
            }
          }
        })
        .state('instaBook', {
          url:'/insta-book',
          views:{
              'place-info':{
                  templateUrl: function(){
                      document.title = "Insta Book @Tourepedia";
                      return './site/html/views/insta-book.html';
                  }
              }
          }
        })
        .state('campusAmbassador', {
          url:'/campus-ambassador',
          views:{
              'place-info':{
                  templateUrl: function(){
                      document.title = "Campus Ambassador @Tourepedia";
                      return './site/html/views/campus-ambassador.html';
                  }
              },
              'fix-plans':{
                  templateUrl:'./site/html/views/fix-plans.html'
              },
              'testimonials':{
                  templateUrl:'./site/html/views/testimonials.html'
              }
          }
        })


}]);


// run at the start
app.run(['$rootScope', function($rootScope){
    $rootScope.$on('$stateChangeStart', function(){
        NProgress.start();
    });
    $rootScope.$on('$stateChangeSuccess', function(){
        NProgress.done();
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    });
}]);

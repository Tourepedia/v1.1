var app = angular.module("tourepedia");


app.directive("myMenu", function(){
    return{
        restrict: 'E',
        templateUrl: './site/html/templates/menu.html'
    };
});

app.directive('myFooter', function(){
    return{
        restrict: 'E',
        templateUrl: './site/html/templates/footer.html'
    };
});
app.directive('myLogin', function(){
    return{
        restrict: 'E',
        templateUrl: './site/html/templates/login.html'
    };
});
app.directive('mySignup', function(){
    return{
        restrict: 'E',
        templateUrl: './site/html/templates/signup.html'
    };
});
app.directive('moveTop', function(){
    return{
        restrict: 'E',
        templateUrl: './shared/html/templates/move-top.html'
    };
});
app.directive('planCosts', function () {
    return{
        restrict: 'E',
        templateUrl: './site/html/templates/plan-costs.html'
    };
});

app.directive('errSrc', function() {
    return {
        link: function(scope, element, attrs) {
            element.bind('error', function() {
                if (attrs.src != attrs.errSrc) {
                    attrs.$set('src', attrs.errSrc);
                }
            });
        }
    };
});

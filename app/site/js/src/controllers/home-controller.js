var app  = angular.module('tourepedia')
.controller('HomeViewController', ['$scope','$interval', function(scope, interval){
    scope.firstTime = true;
    var imagesName = ['1.jpg',
        '2.jpg',
        '3.jpg',
        '4.jpg',
        '6.jpg',
        'tulip garden kashmir.jpg'
    ];
    var i = 0;
    var numOfImages = imagesName.length;
    scope.image1 = imagesName[i];
    i++;
    scope.image2 = imagesName[i];
    interval(UpdateImage, 5000);

    var updatingImage1 = true;

    function UpdateImage(){
        scope.firstTime = false;

        /*
        * we will alter the update of images for both image1 and image2
        * like first update image1, then image2, then image 1, then image 2...*/

        i++;
        if(i >= numOfImages){i=0;}
        if(updatingImage1)
            scope.image1 = imagesName[i];
        else
            scope.image2 = imagesName[i];
        updatingImage1 = !updatingImage1;
    }

    scope.$on('Destroy', function(){console.log("I am destroyed");});

}]);

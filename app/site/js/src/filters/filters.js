var app = angular.module("tourepedia");

// filter for our user application
app.filter('PlaceTypeFilter', function(){
    return function(input, placeTypeFilter){
        var filteredArray = [];
        if(placeTypeFilter.length === 0)
            return input;
        else{
            for(var i=0; i < input.length; i++){
                if(placeTypeFilter.indexOf(input[i].type) != -1){
                    filteredArray.push(input[i]);
                }
            }

        }
        return filteredArray;
    };
});
app.filter('PlacePopularityFilter', function(){
    return function(input, placePopularityFilter){
        var filteredArray = [];
        if(placePopularityFilter.length === 0)
            return input;
        else{
            for(var i=0; i < input.length; i++){
                if(placePopularityFilter.indexOf(input[i].popularity) != -1){
                    filteredArray.push(input[i]);
                }
            }

        }
        return filteredArray;
    };
});


app.filter('OfferFilter', function () {
   return function(input, offerFilter){
    var filteredArray = [];
    if(offerFilter.length == 0 || offerFilter[0] == false)
        return input
    else{
        for(var i = 0; i < input.length; i++){
            if(input[i].discountedPrice != ''){
                filteredArray.push(input[i]);
            }
        }
    }
    return filteredArray;
   };
});

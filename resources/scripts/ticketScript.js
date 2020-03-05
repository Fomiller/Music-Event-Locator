$(document).ready(function() {
    
    function requestInfo() {
        // API KEY
        var apiKey = "apikey=u7Yn7dxpD9z8ujjqVDvDM7MXi56YMO8g";
        // Filter by classification name: name of any segment, genre, sub-genre, type, sub-type. Negative filtering is supported by using the following format '-'. Be aware that negative filters may cause decreased performance.
        var eventType = "classificationName=music&";
        var keyword;
        var city;
        var postalCode;
        var latLong;

        // Radius of the area in which we want to search for events.
        var radius;
        // Unit of the radius "miles", "km
        var unit;
        var stateCode;
        var countryCode;
        var size; 
        
        // asc = ascending z-a; 10-1
        // desc = descending a-z; 1-10
        // Allowable values : 'name,asc', 'name,desc', 'date,asc', 'date,desc', 'relevance,asc', 'relevance,desc', 'distance,asc', 'name,date,asc', 'name,date,desc', 'date,name,asc', 'date,name,desc', 'distance,date,asc', 'onSaleStartDate,asc', 'id,asc', 'venueName,asc', 'venueName,desc', 'random'
        var sort;
        var genreId;

        
        var startDateTime;
        var endDateTime;






        var ticketURL = "https://app.ticketmaster.com/discovery/v2/events.json?" + eventType + apiKey ;
            
        $.ajax({
            url: ticketURL,
            method: "GET",
        }).then(function(response){
            console.log(response);
        })
    
    
    };
    requestInfo(); 



// END DOCUMENT.READY
})


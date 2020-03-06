$(document).ready(function() {
    // GLOBAL VARIABLES
    // API KEY
    var apiKey = "apikey=u7Yn7dxpD9z8ujjqVDvDM7MXi56YMO8g";
    var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?"
    
    function getEventDetails() {
        // Filter by classification name: name of any segment, genre, sub-genre, type, sub-type. Negative filtering is supported by using the following format '-'. Be aware that negative filters may cause decreased performance.
        var eventType = "classificationName=music&";
        var keyword;
        var city;
        var postalCode = "postalCode=" + 37203 + "&";
        // the map api takes in longitude then lat. 
        var latLong;
        // Radius of the area in which we want to search for events.
        var radius;
        // Unit of the radius "miles", "km
        var unit;
        var stateCode;
        var countryCode;
        // sets how many events to return
        var size = "size=" + 10 + "&";
        var page; 
        // asc = ascending z-a; 10-1
        // desc = descending a-z; 1-10
        // Allowable values : 'name,asc', 'name,desc', 'date,asc', 'date,desc', 'relevance,asc', 'relevance,desc', 'distance,asc', 'name,date,asc', 'name,date,desc', 'date,name,asc', 'date,name,desc', 'distance,date,asc', 'onSaleStartDate,asc', 'id,asc', 'venueName,asc', 'venueName,desc', 'random'
        var sort;
        var genreId;
        var startDateTime;
        var endDateTime;

        // URL used to request event details 
        var eventDetailsURL = queryURL + eventType + size + postalCode + apiKey ;
    // ajax request for event details    
        // ajax request for event details    
        $.ajax({
            url: eventDetailsURL,
            method: "GET",
        }).then(function(response){
            // returns response obj
            console.log(response);
            // returns event obj
            console.log(response._embedded);
            // returns array of events
            console.log(response._embedded.events);
            // returns event array index position
            console.log(response._embedded.events[0]);
            // returns event name
            console.log(response._embedded.events[0].name);
            // returns event type
            console.log(response._embedded.events[0].type);
            // returns event id
            console.log(response._embedded.events[0].type);
            // returns url for ticketmaster.com to view event seats and prices
            console.log(response._embedded.events[0].url);

            // returns event venue data
            console.log(response._embedded.events[0]._embedded);
            // returns event venue array
            console.log(response._embedded.events[0]._embedded.venues[0]);
            // returns event venue name
            console.log(response._embedded.events[0]._embedded.venues[0].name);
            // returns event venue postal code
            console.log(response._embedded.events[0]._embedded.venues[0].postalCode);
            // returns event venue city obj
            console.log(response._embedded.events[0]._embedded.venues[0].city);
            // returns event venue city name === string
            console.log(response._embedded.events[0]._embedded.venues[0].city.name);
            // returns event venue state obj
            console.log(response._embedded.events[0]._embedded.venues[0].state);
            // returns event venue state name
            console.log(response._embedded.events[0]._embedded.venues[0].state.name);
            // returns event venue state code; example === "TX", "CO";
            console.log(response._embedded.events[0]._embedded.venues[0].state.stateCode);
            // returns event venue address obj
            console.log(response._embedded.events[0]._embedded.venues[0].address);
            // returns event venue street address; example "1510 Polk St"
            console.log(response._embedded.events[0]._embedded.venues[0].address.line1);
            // returns event venue address city and state; example "Houston, TX"
            console.log(response._embedded.events[0]._embedded.venues[0].address.line2);
            // returns event venue location obj
            console.log(response._embedded.events[0]._embedded.venues[0].location);
            // returns event venue longitude coordinate
            console.log(response._embedded.events[0]._embedded.venues[0].location.longitude);
            // returns event venue latitude coordinate
            console.log(response._embedded.events[0]._embedded.venues[0].location.latitude);
            

            results = {}


            responseArray = [];
            // create the responseArray
            response._embedded.events.forEach(event => {
                responseArray.push(event);
            });

           
           
            for (var i = 0; i < responseArray.length; i++) {
                var currentMarker = [response._embedded.events[0]._embedded.venues[0].location.latitude, response._embedded.events[0]._embedded.venues[0].location.longitude];
                currentMarker = L.marker(currentMarker).addTo(mymap);

                var currentPopup = `<strong>${response._embedded.events[0].name}:</strong> ${response._embedded.events[0]._embedded.venues[0].name}`;
                currentMarker.bindPopup(currentPopup);
                
            }

            resObject = {
                "name": response._embedded.events[0]._embedded.venues[0].name,
                "venueName": response._embedded.events[0]._embedded.venues[0].name,
                "longitude": response._embedded.events[0]._embedded.venues[0].location.longitude,
                "latitude": response._embedded.events[0]._embedded.venues[0].location.latitude,  
            }
            
            var currentMarker = [results.latitude, results.longitude];


            // var currentMarker = [results.latitude, results.longitude];

            // var currentMarker1 = L.marker(currentMarker).addTo(mymap);
            // currentMarker1.bindPopup(`<strong>${response._embedded.events[0].name}:</strong> ${response._embedded.events[0]._embedded.venues[0].name}`);
            // response._embedded.events[0].images.forEach(image => {
            //     console.log(image.url);
            // })
        })
    
    // End getEventDetails function
    };
    getEventDetails(); 

// END DOCUMENT.READY
})


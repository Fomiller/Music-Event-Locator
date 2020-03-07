$(document).ready(function() {
    // GLOBAL VARIABLES
    // API KEY
    var apiKey = "apikey=u7Yn7dxpD9z8ujjqVDvDM7MXi56YMO8g";
    var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?"

    // $("#startDate").on("keyup", function() {
    //     var trace = $(this).val().replace(/\//g, "").substring(0,8);
    //     console.log("LENGTH: ", trace.length);
    //     if (trace.length > 5 && trace.length % 2 === 0)  {
    //         var current = trace.replace(/^([0-1]?[0-9]){1}([0-3]?[0-9]){1}(20\d\d){1}$/, "$1/$2/$3");
    //         console.log("BEFORE: ", current);
    //         if (moment(current).isValid()) {
    //             console.log("IS VALID");
    //             current = moment(current).format("MM/DD/YYYY");
    //         } else {
    //             console.log("NOT VALID");
    //         }
    //     }
    //     var value = (current) ? current : trace;
    //     console.log("AFTER: ", value);
    //     $(this).val(value);
    // });
    
    function getEventDetails() {
        var keyword = "keyword=" + $("#artistID").val() + "&";
        var eventType = "classificationName=";
        var getGenre = $("#genreID").val();
        var stateCode = "stateCode=" + $("#stateID").val() + "&";
        var postalCode = "postalCode=" + $("#zipID").val() + "&";
        var radius = "radius=" + $("#radiusID").val() + "&";
        var unit = "unit=miles&"
        var size = "size=" + 50 + "&";

        // GENRE LOGIC
        // Get genre value as a string from genreID input
        function genreFunction() {
            if ($("#genreID").val() === ""){
                return eventType
            } else {
                // create and array from the getGenre variable
                genreArray = getGenre.split(",");

                // concat the indiviudal comma seperated values into a string that starts with classificationName= and ends in an "&"
                var eventTypeFunc = function() {
                    genreArray.forEach(input => eventType += input.trim() + "+")
                    return eventType;
                }
                eventTypeFunc();
            }
        }

        genreFunction();
            
        // URL used to request event details 
        var eventDetailsURL = queryURL + keyword + eventType + "&" + stateCode + postalCode + radius + unit + size + apiKey ;
        console.log(eventDetailsURL)
        console.log("keyword: " + keyword)
        console.log("event type: " + eventType);
        console.log("state Code: " + stateCode);
        console.log("postal Code: " + postalCode);
        console.log("radius: " + radius)

        // ajax request for event details    
        $.ajax({
            url: eventDetailsURL,
            method: "GET",
        }).then(function(response){

            // create the responseArray
            responseArray = [];

            // populate the responseArray
            response._embedded.events.forEach(event => {responseArray.push(event);});

            // Pans to recenter map, zooms in closer.
            mymap.panTo([responseArray[0]._embedded.venues[0].location.latitude, responseArray[0]._embedded.venues[0].location.longitude]);
        
            // For Loop creates pins for every search result and places them on map
            for (var i = 0; i < responseArray.length; i++) {
            // Sets latitude and longitude of current marker
            var currentMarker = [responseArray[i]._embedded.venues[0].location.latitude, responseArray[i]._embedded.venues[0].location.longitude];

            // Pins current marker to map
            newMarker = L.marker(currentMarker).addTo(mymap);

            // Creates text for current popup
            var newPopup = `<strong>${responseArray[i].name}:</strong> ${responseArray[i]._embedded.venues[0].name}`;
            
            // Adds current popup to current marker
            newMarker.bindPopup(newPopup); 
        }


        // This function will place the results onto the results page.
        for (var i = 0; i < responseArray.length; i++) {
            for (var i = 0; i < responseArray.length; i++) {
                createCard(responseArray[i])
            }
        };
    });
    
    // End getEventDetails function
    };



    // This will need to be run x number of times based on what local storage returns
    function createCard(bandArr) {
        console.log("BAND: " + bandArr)

        // Assembles components for outer framework for band card
        var outerContainer = $("<div>").addClass("columns");
        var innerContainer = $("<div>").addClass("column");
        var bandCard = $("<div>").addClass("card");
        var innerColumns = $("<div>").addClass("columns");

        // Builds out base divs to be filled
        var imageDiv = $("<div>").addClass("column is-3");
        var descriptionDiv = $("<div>").addClass("column");

        // Builds image for imageDiv
        var imgFigure = $("<figure>").addClass("image");
        var img = $("<img>").attr({ "src": bandArr.images[2].url, "alt": `${bandArr.name} image` });

        // Builds Star Button
        var button = $("<button>").addClass("button is-white").attr({ "id": bandArr.id, "data-is-saved": false });
        var buttonSpan = $("<span>").addClass("icon");
        var iconImg = $("<i>").addClass("far fa-star").css("color", "#e6e600")
        button.append(buttonSpan.append(iconImg));

        // Builds all components for descriptionDiv
        var title = $("<h3>").addClass("title is-3").text(bandArr.name).append(button);
        var bioDiv = $("<div>");
        
        var eventVenue = $("<h5>").addClass("title is-5 is-inline mr-1").text(bandArr._embedded.venues[0].name);
        var eventDate = $("<h5>").addClass("title is-5 is-inline").text(bandArr.dates.start.localDate)
        bioDiv.append(eventVenue, eventDate);

        // Pieces together each major Div
        descriptionDiv.append(title, bioDiv);
        imageDiv.append(imgFigure.append(img));

        // Builds all outer framework
        innerColumns.append(imageDiv, descriptionDiv);
        bandCard.append(innerColumns);
        innerContainer.append(bandCard);
        outerContainer.append(innerContainer);

        // Appends new artist to html
        $("#search-section").append(outerContainer);
    };



    $("#submitBtn").on("click", getEventDetails);
    // getEventDetails(); 

// END DOCUMENT.READY
})


// GLOBAL VARIABLES
// API KEY
var apiKey = "apikey=u7Yn7dxpD9z8ujjqVDvDM7MXi56YMO8g";
var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?"
console.log(gpsObj)
eventType = "classificationName="
colorBtn=null;

$(document).ready(function() {

    var featureEvents = function(){
        var eventType = "classificationName=music&";
        var latlon = "&latlong=" + 35.9328 + "," + -86.8788;
        var size = "size=" + 3 + "&";
        var radius = "radius=" + 100 + "&";
            
        // URL used to request event details 
        var featureEventsURL = queryURL + eventType + size + radius + apiKey + latlon;
    
        // ajax request for featured event details    
        $.ajax({
            url: featureEventsURL,
            method: "GET",
        }).then(function(featureResponse){
    
            console.log(featureResponse);
            // create the featureResponseArray
            featureResponseArray = [];
            // populate the featureResponseArray
            featureResponse._embedded.events.forEach(event => {featureResponseArray.push(event);});
            
    
            // This function will place the results onto the results page.
            for (var i = 0; i < featureResponseArray.length; i++) {
                for (var i = 0; i < featureResponseArray.length; i++) {
    
                    // Assembles components for outer framework for band card
                    var innerContainer = $("<div>").addClass("column is-one-third");
                    var bandCard = $("<div>").addClass("card").css("min-height", "550px");
    
                    // Builds out base divs to be filled
                    var imageDiv = $("<div>").addClass("card-image");
                    var contentDiv = $("<div>").addClass("card-content");
    
                    // Builds image for imageDiv
                    var imgFigure = $("<figure>").addClass("image is-4by3");
                    var img = $("<img>").attr({ "src": featureResponseArray[i].images[2].url, "alt": `${featureResponseArray[i].name} image` });
    
                    // Builds Star Button
                    var button = $("<button>").addClass("button is-white bandButton").attr({ "id": featureResponseArray[i].id, "data-is-saved": false });
                    var buttonSpan = $("<span>").addClass("icon");
                    var iconImg = $("<i>").addClass("far fa-star").css("color", "#e6e600")
                    button.append(buttonSpan.append(iconImg));
    
                    // Builds all components for contentDiv
                    var media = $("<div>").addClass("media");
                    var mediaContent = $("<div>").addClass("media-content");
                    var titleDiv = $("<h4>").addClass("title is-4 featured-title").text(featureResponseArray[i].name).append(button);
                    var featuredContentDiv = $("<div>").addClass("content featured-content");
                    var break1 = $("<br>")
                    var eventVenue = $("<h5>").addClass("title is-5 is-inline mr-1").text(featureResponseArray[i]._embedded.venues[0].name);
                    var timeDiv = $("<time>").text(featureResponseArray[i].dates.start.localDate)
    
                    // pieces together media div
                    media.append(mediaContent.append(titleDiv));
    
                    // pieces together featured content div
                    featuredContentDiv.append(eventVenue, break1, timeDiv)
    
                    // Pieces together each major Div
                    contentDiv.append(media, featuredContentDiv);
                    imageDiv.append(imgFigure.append(img));
    
                    // Builds all outer framework
                    bandCard.append(imageDiv, contentDiv);
                    innerContainer.append(bandCard);
                    $("#featuredBandsColumns").append(innerContainer);                  
                }
                $(".bandButton").on("click", function () {
                    // Fills in star icon
                    $(this).children().children().addClass("fas");
                    
                    // Creates band obj to send to localStorage
                    var savedBandId = $(this).attr("id")
                    var savedBandName = $(this).parent().text();
                    var savedBandVenue = $(this).parent().parent().parent().siblings(".featured-content").children(":first").text();
                    var savedBandDate = $(this).parent().parent().parent().siblings(".featured-content").children(":last").text()
                    var savedBandImgSrc = $(this).parent().parent().parent().parent().siblings(".card-image").children().children().attr("src");
    
                    var newSavedBand = {
                        "id": savedBandId,
                        "name": savedBandName,
                        "venue": savedBandVenue,
                        "date": savedBandDate,
                        "imgSrc": savedBandImgSrc
                    }
    
                    // Adds chosen band object to local storage
                    var savedBands = JSON.parse(localStorage.getItem("favoriteBands")) || [];
                    savedBands.push(newSavedBand);
                    localStorage.setItem("favoriteBands", JSON.stringify(savedBands));
                    
    
                })
            };
        })
    
    };
    featureEvents();

    function getEventDetails() {
        // console.log("submitbutton: " + colorBtn);
        var keyword = "keyword=" + $("#artistID").val() + "&";
        console.log(eventType);
        var getGenre = $("#genreID").val();
        var stateCode = "stateCode=" + $("#stateID").val() + "&";
        var postalCode = "postalCode=" + $("#zipID").val() + "&";
        var radius = "radius=" + $("#radiusID").val() + "&";
        var unit = "unit=miles&"
        var size = "size=" + 25 + "&";


        // eventType = setClassificationName(colorBtn);

        
        // GENRE LOGIC
        // Get genre value as a string from genreID input
        function genreFunction() {
                // create and array from the getGenre variable
                genreArray = getGenre.split(",");

                var eventTypeFunc = function() {
                    genreArray.forEach(input => eventType += input.trim() + "+")
                    return eventType;
                }
                
                if (typeof colorBtn === null){
                    console.log(colorBtn)
                }  else if (colorBtn === "1") {
                    genreArray.push("country")
                } else if (colorBtn === "2") {
                    genreArray.push("electronic")
                    genreArray.push("rap")
                } else if (colorBtn === "3") {
                    genreArray.push("blues")
                } else if (colorBtn === "4") {
                    // genreArray.push("music");
                    // genreArray.push("jazz")
                    genreArray.push("blues")
                    genreArray.push("country")
                    genreArray.push("rock")
                    
                } else {
                    eventType = "classificationName="
                }
                eventTypeFunc();
                // concat the indiviudal comma seperated values into a string that starts with classificationName= and ends in an "&"
            
        };
        genreFunction();
        
            
        // URL used to request event details 
        var eventDetailsURL = queryURL + keyword + eventType + "&" + stateCode + postalCode + radius + unit + size + apiKey ;
        console.log(eventDetailsURL);
        // ajax request for event details    
        $.ajax({
            url: eventDetailsURL,
            method: "GET",
        }).then(function(response){
            console.log(response)
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
                var img = $("<img>").attr({ "src": responseArray[i].images[2].url, "alt": `${responseArray[i].name} image` });
                var buyTickets = $("<a>").attr({"href": responseArray[i].url, "target": "_blank"}).text("Buy tickets here!")
                

                // Builds Star Button
                var button = $("<button>").addClass("button is-white bandButton").attr({ "id": responseArray[i].id, "data-is-saved": false });
                var buttonSpan = $("<span>").addClass("icon");
                var iconImg = $("<i>").addClass("far fa-star").css("color", "#e6e600")
                button.append(buttonSpan.append(iconImg));


                // Builds all components for descriptionDiv
                var title = $("<h3>").addClass("title is-3").text(responseArray[i].name).append(button);
                var bioDiv = $("<div>");

                var eventVenue = $("<h5>").addClass("title is-5 is-inline mr-1").text(responseArray[i]._embedded.venues[0].name);
                var eventDate = $("<h5>").addClass("title is-5 is-inline").text(responseArray[i].dates.start.localDate)
                bioDiv.append(eventVenue, eventDate);

                // Pieces together each major Div
                descriptionDiv.append(title, bioDiv);
                imageDiv.append(imgFigure.append(img), buyTickets);

                // Builds all outer framework
                innerColumns.append(imageDiv, descriptionDiv);
                bandCard.append(innerColumns);
                innerContainer.append(bandCard);
                outerContainer.append(innerContainer);

                // Appends new artist to html
                $("#search-section").append(outerContainer);

                

            }
            $(".bandButton").on("click", function () {
                // Fills in star icon
                $(this).children().children().addClass("fas");
                
                // Creates band obj to send to localStorage
                var savedBandId = $(this).attr("id")
                var savedBandName = $(this).parent().text();
                var savedBandVenue = $(this).parent().siblings().children(":first").text()
                var savedBandDate = $(this).parent().siblings().children(":last").text();
                var savedBandImgSrc = $(this).parent().parent().siblings().children().children().attr("src");
                var savedBandLink = $(this).parent().parent().siblings().children(":last").attr("href");

                var newSavedBand = {
                    "id": savedBandId,
                    "name": savedBandName,
                    "venue": savedBandVenue,
                    "date": savedBandDate,
                    "imgSrc": savedBandImgSrc,
                    "link": savedBandLink
                }

                // Adds chosen band object to local storage
                var savedBands = JSON.parse(localStorage.getItem("favoriteBands")) || [];
                savedBands.push(newSavedBand);
                localStorage.setItem("favoriteBands", JSON.stringify(savedBands));
                

            })
        };



        
    });
    

    eventType = "classificationName=";
    genreArray= [];
    colorBtn = null;
    $("#genreID").val("")
    // End getEventDetails function
    };


    $("#mood1").on("click", function() {
        colorBtn = $(this).val()
        console.log(colorBtn)
        console.log(eventType) 
  
      })
      $("#mood2").on("click", function() {
          colorBtn = $(this).val()
          console.log(colorBtn)
          console.log(eventType) 
  
      })
      $("#mood3").on("click", function() {
          colorBtn = $(this).val()
          console.log(colorBtn)

  
      })
      $("#mood4").on("click", function() {
          colorBtn = $(this).val()
          console.log(colorBtn)
          console.log(eventType) 
  
      })


    $("#submitBtn").on("click", function() {
        getEventDetails()
        $('html, body').animate({
            scrollTop: $('.mapboxArea').offset().top
        }, 200);
    });
    // getEventDetails(); 
// END DOCUMENT.READY
});
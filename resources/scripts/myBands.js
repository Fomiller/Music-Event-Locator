$(document).ready(function() {
  // Initializes global savedBands variable
  var savedBands = [];

  function populateFavoriteBands() {
    // Receives information from local storage or returns empty array
    savedBands = localStorage.getItem("favorite_bands") || [];

    // Sets outer framework for band card
    var outerContainer = $("<div>").addClass("columns");
    var innerContainer = $("<div>").addClass("column");
    var bandCard = $("<div>").addClass("card");
    var innerColumns = $("<div>").addClass("columns");

    // Builds out base divs to be filled
    var imageDiv = $("<div>").addClass("column is-3");
    var descriptionDiv = $("<div>").addClass("column");
    var starDiv = $("<div>").addClass("column is-1 level");

    // Builds image for imeageDiv
    var imgFigure = $("<figure>").addClass("image is-16by9")
    var img = $("<img>").attr({ "src": "https://bulma.io/images/placeholders/640x360.png", "alt": "placeholder img"});

    // Builds all data for descriptionDiv
    var title = $("<h3>").addClass("title is-3").text("Band Name");
    var bioDiv = $("<div>");
    var bio = $("<p>").addClass("mb-1").text("Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi corrupti possimus officiis officia dolorum sit quia explicabo sed sunt ex nihil minus molestiae vel at, repudiandae error ducimus. Deserunt, eius.");
    var eventVenue = $("<h5>").addClass("title is-5 is-inline mr-1").text("Event Venue");
    var eventDate = $("<h5>").addClass("title is-5 is-inline").text("Date")

    var levelItem = $("<div>").addClass("level-item");
    var button = $("<button>").addClass("button");
    


    // Pieces together each major Div
    bioDiv.append(bio, eventVenue, eventDate);
    descriptionDiv.append(title, bioDiv);
    starDiv.append(levelItem.append(button))

    imageDiv.append(imgFigure.append(img));

    // Builds all outer framework
   innerColumns.append(imageDiv, descriptionDiv, starDiv);
   bandCard.append(innerColumns);
   innerContainer.append(bandCard);
   outerContainer.append(innerContainer)

   // Appends new artist to html
    $("#myBandsContainer").append(outerContainer)
  }


  populateFavoriteBands()



})
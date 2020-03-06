$(document).ready(function() {

  // Receives information from local storage or returns empty array
  var savedBands = JSON.parse(localStorage.getItem("favoriteBands")) || [];
  console.log(savedBands)

  function addSavedArtistsToPage() {
    for (var i = 0; i < savedBands.length; i++) {
      createFavoriteBandsCard(savedBands[i])
    }
  };

  // This will need to be run x number of times based on what local storage returns
  function createFavoriteBandsCard(bandArr) {
    console.log(bandArr)

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
    var img = $("<img>").attr({ "src": bandArr.imgSrc, "alt": `${bandArr.name} image`});
    
    // Builds Star Button
    var button = $("<button>").addClass("button is-white").attr({"id": bandArr.id, "data-is-saved": true});
    var buttonSpan = $("<span>").addClass("icon");
    var iconImg = $("<i>").addClass("fas fa-star").css("color", "#e6e600")
    button.append(buttonSpan.append(iconImg));
    
    // Builds all components for descriptionDiv
    var title = $("<h3>").addClass("title is-3").text(bandArr.name).append(button);
    var bioDiv = $("<div>");
    var bio = $("<p>").addClass("mb-1").text("Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi corrupti possimus officiis officia dolorum sit quia explicabo sed sunt ex nihil minus molestiae vel at, repudiandae error ducimus. Deserunt, eius.");
    var eventVenue = $("<h5>").addClass("title is-5 is-inline mr-1").text(bandArr.venue);
    var eventDate = $("<h5>").addClass("title is-5 is-inline").text(bandArr.date)
    bioDiv.append(bio, eventVenue, eventDate);

    // Pieces together each major Div
    descriptionDiv.append(title, bioDiv);
    imageDiv.append(imgFigure.append(img));

   // Builds all outer framework
   innerColumns.append(imageDiv, descriptionDiv);
   bandCard.append(innerColumns);
   innerContainer.append(bandCard);
   outerContainer.append(innerContainer);

   // Appends new artist to html
    $("#myBandsContainer").append(outerContainer);
  };

  addSavedArtistsToPage();

  $(".button").on("click", function() {

    // Changes star to become just an outline
    $(this).children().children().toggleClass("far");

    $(this).parent().parent().parent().empty();

    for (var i = 0; i < savedBands.length; i++) {
      if (savedBands[i].id === $(this).attr("id")) {
        savedBands.splice(i,1);
        
        localStorage.setItem("favoriteBands", JSON.stringify(savedBands));
      }
    }


  })

});


/*
favoriteBands: [{"id": "0001", "name": "The Head and the Heart", "venue": "Ascend Ampitheatre", "date": "May 5", "imgSrc": "https://upload.wikimedia.org/wikipedia/commons/c/ca/THATH_sunset.jpg"}, {"id": "0002", "name": "Billie Eyelash", "venue": "Bridgestone Arena", "date": "May 6", "imgSrc": "https://pmcvariety.files.wordpress.com/2019/12/billie-eilish-cover-story-7.jpg?w=1000&h=1250"}]

*/

// Gets user coords in order to center map
navigator.geolocation.getCurrentPosition(function(res) {
  var lat = res.coords.latitude;
  var long = res.coords.longitude;
  var userCoords = [lat, long];

  // Creates a new map using user coords
  var mymap = L.map('map').setView(userCoords, 12);

  // Styles newly created map
  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/dark-v10',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiZ2FycmV0dG1yb2JlcnRzIiwiYSI6ImNrN2Rxcm4zYjAwbmkzZm50NXh5d211MnEifQ.QfPRfpUkyKGIjSdjfAzMkg'
  }).addTo(mymap);
});
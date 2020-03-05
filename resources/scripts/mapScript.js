// Leaflet Docs: https://leafletjs.com/examples/quick-start/

// Receives lat and long from form for centering the map
var longLat = [36.165726, -86.784032];

// Initializes a new map
var mymap = L.map('map').setView(longLat, 13);


// Map will configure while using mapbox
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox/dark-v10',
  tileSize: 512,
  zoomOffset: -1,
  accessToken: 'pk.eyJ1IjoiZ2FycmV0dG1yb2JlcnRzIiwiYSI6ImNrN2Rxcm4zYjAwbmkzZm50NXh5d211MnEifQ.QfPRfpUkyKGIjSdjfAzMkg'
}).addTo(mymap);


// A For Loop will cycle through Search Results and Build Map Pins
// var newMarker1 = [36.166285, -86.771543];
// var newMarker2 = [36.177561, -86.793194];

// var marker1 = L.marker(newMarker1).addTo(mymap);
// var marker2 = L.marker(newMarker2).addTo(mymap);

// marker1.bindPopup("<strong>A POPUP</strong> Check me out.")
// marker2.bindPopup("And I'm a different popup!")



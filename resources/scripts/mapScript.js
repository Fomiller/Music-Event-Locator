// Leaflet Docs: https://leafletjs.com/examples/quick-start/

// Receives lat and long from geoPlugin API

// If user does not enter city input
var longLat = [geoplugin_latitude(), geoplugin_longitude()];

// If user enters city input, will need a different longLat


// Initializes a new map
var mymap = L.map('map').setView(longLat, 12);


// Map will configure while using mapbox
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox/dark-v10',
  tileSize: 512,
  zoomOffset: -1,
  accessToken: 'pk.eyJ1IjoiZ2FycmV0dG1yb2JlcnRzIiwiYSI6ImNrN2Rxcm4zYjAwbmkzZm50NXh5d211MnEifQ.QfPRfpUkyKGIjSdjfAzMkg'
}).addTo(mymap);


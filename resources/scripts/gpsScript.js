gpsObj = {};

$.getJSON('https://geolocation-db.com/json/').done (function(location) {
    gpsObj.country = location.country_name
    gpsObj.state = location.state
    gpsObj.city = location.city
    gpsObj.latitude = location.latitude
    gpsObj.longitude = location.longitude
    gpsObj.ip = location.IPv4
});

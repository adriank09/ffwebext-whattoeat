'use strict';
/*
    GrabCoffee

    Uses API
    - Foursquare
    - HTML5 Geolocation

*/

// Constant
var foursquare_client_ID = "XXX"; // replace with your own client ID
var foursquare_client_secret ="XXX"; // replace with your own client secret
var foursquare_area_radius = 1000;
var foursquare_explore_section = "food";
var this_longitude = '';
var this_latitude = '';

var app = document.getElementById('app');

// Event
window.onload = initApp();

// Initialize the webext app
function initApp() {
    
    // get the geolocation component, and pass the owner's location (lat & lang)
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(setCoordinate);
    }

}

// Returns the Foursquare HTTP endpoint
function getFoursquareExploreEndpoint(lat, long) {
    return "https://api.foursquare.com/v2/venues/explore?ll="+lat+","+long+"&section="+foursquare_explore_section+"&radius="+foursquare_area_radius+"&client_id="+foursquare_client_ID+"&client_secret="+foursquare_client_secret+"&v=20161016";
}

// inner function used by getLocation()
function setCoordinate(position) {
    this_latitude = position.coords.latitude;
    this_longitude = position.coords.longitude;

    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {        
            // if everything goes well, load the app  
            loadApp(xhr.responseText);
        }
    }

    xhr.open('get', getFoursquareExploreEndpoint(this_latitude, this_longitude));
    xhr.send();
}

// Loads the app and render the view
function loadApp(json) {
    // parse it so we can use it later
    var obj = JSON.parse(json);
    // draw the view
    var view = '<div class="panel panel-default"><div class="panel-body">';

        view += '<p>Here are some places to chill in <strong>' + obj.response.headerFullLocation + '</strong>!</p>';
        
        // item groups
        for(var i = 0; i < obj.response.groups.length; i++) {
            // do nothing...?
        }

    view += '</div></div>';
    // render it!
    app.innerHTML = view;
}

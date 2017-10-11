'use strict';
/*
    GrabCoffee

    Uses API
    - Foursquare
    - HTML5 Geolocation

*/

// Constant
var foursquare_client_ID = "R1SLWIBY31S4DXJ1CZ3SNZ1VBPMEKQ3DJ5LP5KX0FY3QRVST";
var foursquare_client_secret ="CYENH2FDBSD2BLEEHBLQF2P1QTZKITQSUBLUID2AO5HQRA1M";
var foursquare_area_radius = 1000;
var foursquare_explore_section = "food";
var this_longitude = '';
var this_latitude = '';

var app = document.getElementById('app');

// Event
window.onload = initApp();

// Initialize the webext app
function initApp() {
    
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(setCoordinate);
    }

}

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

function loadApp(json) {
    // parse it so we can use it later
    var obj = JSON.parse(json);

    var view = '<div class="panel panel-default"><div class="panel-body">';

        view += '<p>Here are some places to chill in <strong>' + obj.response.headerFullLocation + '</strong>!</p>';
        
        // item groups

    view += '</div></div>';
    app.innerHTML = view;
}
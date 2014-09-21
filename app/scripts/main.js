
/* ==========================================================================
Google Maps API code below:
========================================================================== */
//Sets Google Maps options & initializes Google Maps
function initialize() {
        //Applies map options
        var mapOptions = {
          center: { lat: 34.840143, lng: -82.398298},
          zoom: 16,
          zoomControl: true,
          panControl: false,
          scaleControl: false,
          streetViewControl: true
        };

        //Creates a instance of the Map object
        var map = new google.maps.Map(document.getElementById('map_canvas'),
            mapOptions);

        //Adds place marker to map
        var marker = new google.maps.Marker({
          position: { lat: 34.840125, lng: -82.398303},
          map: map,
          title: 'Swamp Rabbit Cycling Mo-fo! Ride or Die!!!'
        });

        var panoramaOptions = {
          position: new google.maps.LatLng(34.840125, -82.398303),
          pov: {
            heading: 34,
            pitch: 10
          }
        };

        var panorama = new google.maps.StreetViewPanorama(document.getElementById('map_street_view'), panoramaOptions);

        map.setStreetView(panorama);

      }

google.maps.event.addDomListener(window, 'load', initialize);

//Google Maps Geo Location Data
var address = "The Iron Yard 411 University Ridge Greenville, SC 29601";
var geo_url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address;

var geo = $.ajax({
  type: 'GET',
  url: geo_url,
  success: function(results){
    var lat = results.results[0].geometry.location.lat;
    var lng = results.results[0].geometry.location.lng;

    console.log(lat, lng);
  }
});




/* ==========================================================================
Flicker API code below:
========================================================================== */

var flickrApi = 'https://api.flickr.com/services/rest/?&method=flickr.photos.search&api_key=a59e46bc559caf69b42be8464990c102&format=json&tags=bicycles,bicycle&per_page=3&extras=last_update&jsoncallback=?';

//attempting to get the data with a basic ajax request (doesn't work, but throws no errors??)

$.ajax({
  type: 'GET',
  url: flickrApi,
  dataType: 'json'
}).done(function(data) {
  var sortedData = _.sortBy(data.photos.photo, function(photo){
    return photo.lastupdated;
  });
  _.each(sortedData, function(photo, n) {
    // photo.left = 480*n;
    renderTemplate('#templates-bicycle-pics', '.bicycle-pics', photo);
  });
  flickrSwipe();
});


function flickrSwipe(){
// add left property to all bike-pic li's
  $('.bike-pic').css('left', function(n){
    return n*480 + "px";
  });

  $('.bike-pic').hammer({}).bind('swipeleft', function(){
    if(!$(this).is('li:last-of-type')){
      console.log('swipe left');
    }
  });
  $('.bike-pic').hammer({}).bind('swiperight', function(){
    if(!$(this).is('li:first-of-type')){
      console.log('swipe right');
    }
  });
}


/* ==========================================================================
Underscore Render Template code below:
========================================================================== */

function renderTemplate(templateID, location, dataModel) {
  var templateString = $(templateID).text();
  var templateFunction = _.template(templateString);
  var renderedTemplate = templateFunction(dataModel);
  $(location).append(renderedTemplate);
}

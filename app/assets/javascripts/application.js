// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery3
//= require jquery_ujs
//= require popper
//= require bootstrap
//= require bootstrap-sprockets
//= require activestorage
//= require turbolinks
//= require_tree .
//= require bootstrap-slider

$(document).on('keyup', '.number-format', function (e) {
    let input = $(event.target).val();
    input = input.replace(/[\D\s\._\-]+/g, "");
    input = input ? parseInt(input, 10) : 0;
    $(event.target).val(function () {
        let num = (input === 0) ? "" : input.toLocaleString("en-US");
        return num.split(",").join(".");
    });
});

$(document).on('click', '#guardar-maximum-budget', function (e) {
    let presupuesto = $('#maximum-budget').val();
    localStorage.setItem("maximum-budget", presupuesto);
    $('#maximum-budget-modal').modal('hide');
});

function initMap2() {
    var lat = document.getElementById('order_latitude').value;
    var lng = document.getElementById('order_longitude').value;

    // if not defined create default position
    if (!lat || !lng){
        lat=51.5;
        lng=-0.125;
        document.getElementById('order_latitude').value = lat;
        document.getElementById('order_longitude').value = lng;
    }

    var myCoords = new google.maps.LatLng(lat, lng);
    var mapOptions = {
        center: myCoords,
        zoom: 14
    };

    var map = new google.maps.Map(document.getElementById('map2'), mapOptions);

    var marker = new google.maps.Marker({
        position: myCoords,
        animation: google.maps.Animation.DROP,
        map: map,
        draggable: true
    });

    // refresh marker position and recenter map on marker
    function refreshMarker(){
        var lat = document.getElementById('order_latitude').value;
        var lng = document.getElementById('order_longitude').value;
        var myCoords = new google.maps.LatLng(lat, lng);
        marker.setPosition(myCoords);
        map.setCenter(marker.getPosition());
    }
    // when input values change call refreshMarker
    document.getElementById('order_latitude').onchange = refreshMarker;
    document.getElementById('order_longitude').onchange = refreshMarker;

    // when marker is dragged update input values
    marker.addListener('drag', function() {
        latlng = marker.getPosition();
        newlat=(Math.round(latlng.lat()*1000000))/1000000;
        newlng=(Math.round(latlng.lng()*1000000))/1000000;
        document.getElementById('order_latitude').value = newlat;
        document.getElementById('order_longitude').value = newlng;
    });

    // When drag ends, center (pan) the map on the marker position
    marker.addListener('dragend', function() {
        map.panTo(marker.getPosition());
    });

}
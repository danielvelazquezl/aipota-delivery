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
    let lat = document.getElementById('order_latitude').value;
    let lng = document.getElementById('order_longitude').value;
    //if not defined create default position
    if (!lat || !lng){
        let geoSuccess = function(position) {
            lat = position.coords.latitude;
            lng = position.coords.longitude;
            document.getElementById('order_latitude').value = position.coords.latitude;
            document.getElementById('order_longitude').value = position.coords.longitude;
            load(lat,lng)
        };
        navigator.geolocation.getCurrentPosition(geoSuccess);
    }else{
        load(lat,lng)
    }

    function load(lat, lng) {
        let myCoords = new google.maps.LatLng(lat, lng);
        let mapOptions = {
            center: myCoords,
            zoom: 14
        };
        let map = new google.maps.Map(document.getElementById('map2'), mapOptions);

        let marker = new google.maps.Marker({
            position: myCoords,
            animation: google.maps.Animation.DROP,
            map: map,
            draggable: true
        });

        // refresh marker position and recenter map on marker
        function refreshMarker(){
            let lat = document.getElementById('order_latitude').value;
            let lng = document.getElementById('order_longitude').value;
            let myCoords = new google.maps.LatLng(lat, lng);
            marker.setPosition(myCoords);
            map.setCenter(marker.getPosition());
        }
        //when input values change call refreshMarker
        document.getElementById('order_latitude').onchange = refreshMarker;
        document.getElementById('order_longitude').onchange = refreshMarker;

        //when marker is dragged update input values
        marker.addListener('drag', function() {
            let latlng = marker.getPosition();
            let newlat=(Math.round(latlng.lat()*1000000))/1000000;
            let newlng=(Math.round(latlng.lng()*1000000))/1000000;
            document.getElementById('order_latitude').value = newlat;
            document.getElementById('order_longitude').value = newlng;
        });

        //When drag ends, center (pan) the map on the marker position
        marker.addListener('dragend', function() {
            map.panTo(marker.getPosition());
        });
    }
}
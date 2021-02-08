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
    let presupuesto_int = parseInt(presupuesto.toString().replace(".", ""))
    let new_porcentaje = (localStorage.getItem('total') * 100) / presupuesto_int
    localStorage.setItem("maximum-budget", presupuesto);
    $('.progress-bar').css('width', new_porcentaje+'%').attr('aria-valuemax', presupuesto_int);
    $('#maximum-budget-modal').modal('hide');
});


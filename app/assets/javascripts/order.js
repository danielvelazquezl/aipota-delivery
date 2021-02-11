$(function () {
    if (JSON.parse(localStorage.getItem('cart-items')) != null) {
        for (let k in JSON.parse(localStorage.getItem('cart-items'))) {
            $('#order-table-body').append(
                '<tr>' +
                '<th scope="col" class="text-left">' + JSON.parse(localStorage.getItem('cart-items'))[k].description +
                '</th>' +
                '<td class="text-center">' + JSON.parse(localStorage.getItem('cart-items'))[k].quantity + '</td>' +
                '<td class="text-center">' + JSON.parse(localStorage.getItem('cart-items'))[k].quantity *
                JSON.parse(localStorage.getItem('cart-items'))[k].price + '</td>' +
                '</tr>'
            );
        }
    }
    $('#order-total-label').text((localStorage.getItem('total') ? localStorage.getItem('total') : 0) + " Gs.");
    $('#order-total-input').val(localStorage.getItem('total') ? localStorage.getItem('total') : 0);
    // after buy, remove items
    $('#buy-button').click(() => {
        localStorage.removeItem('cart-items');
        localStorage.removeItem('notification');
        localStorage.removeItem('total');
    })
})
const maxQuantity = 10;
const defaultMessage = '1 Un.';
localStorage.setItem("notification", 0);
paintProgressBar();
/**
 * Get the product ID number from the id attribute
 * @param text
 * @returns {*}
 */
getIdFromText = text => {
    return text.match(/\d+/)[0];
}
/**
 * Get the element from the dom
 * @param element
 * @returns {*|Window.jQuery|HTMLElement}
 */
getSpanElement = element => {
    return $('#quantityLabel-' + getIdFromText(element));
}

/**
 * Convert the span element value to number
 * @param element
 */
getElementValue = element => {
    return !element.html().localeCompare(defaultMessage) ? 1 : parseInt(element.html());
}

$(function () {
    // add quantity
    $('.addQuantityButton').click(() => {
        let spanElement = getSpanElement(this.activeElement.id);
        let spanValue = getElementValue(spanElement);
        // if the spanValue is less than 'maxQuantity' add 1
        spanValue < maxQuantity && spanElement.html(++spanValue);
    });
    // subtract quantity
    $('.subQuantityButton').click(() => {
        let spanElement = getSpanElement(this.activeElement.id);
        let spanValue = getElementValue(spanElement);
        // greater than 1, replace the html value with 'spanValue'
        if (--spanValue > 1) {
            spanElement.html(spanValue);
        } else if (spanValue === 1) { // equal to 1, replace the html value with 'defaultMessage'
            spanElement.html(defaultMessage);
        }
    });
    // add item to cart
    $('.addItem').click(() => {
        //notificaciones
        if(localStorage.getItem("notification") == null){
            localStorage.setItem("notification", 1);
        }
        localStorage.setItem('notification',parseInt(localStorage.getItem('notification'))+1);
        $('.button-num').text(localStorage.getItem('notification'));
        mostrarNotification();
        //fin notificaciones

        let product_id = getIdFromText(this.activeElement.id);
        let product = {
            id: product_id,
            description: $('#productDescription-' + product_id).html(),
            price: getIdFromText($('#productPrice-' + product_id).html()),
            quantity: getElementValue($('#quantityLabel-' + product_id))
        }
        let items = JSON.parse(localStorage.getItem('cart-items')) != null ?
            JSON.parse(localStorage.getItem('cart-items')) : {};
        items[product_id] = product;
        let total = 0;

        Object.entries(items).forEach(function (record) {
            total += (record[1].price * record[1].quantity);
        });
        localStorage.setItem('total', total);
        localStorage.setItem('cart-items', JSON.stringify(items));

        paintProgressBar();
    });

    //notificaciones
    $('#cart-button').click(() => {
        localStorage.setItem("notification", 0);
        ocultarNotification();
    });
    //fin notificaciones

});

function ocultarNotification(){
    document.getElementById('notification').style.display = 'none';
}

function mostrarNotification(){
    document.getElementById('notification').style.display = 'block';
}

function paintProgressBar(){
    if(localStorage.getItem('maximum-budget') != null && localStorage.getItem('maximum-budget') !== ''){
        let total = localStorage.getItem('total');
        let presupuesto_int = parseInt(localStorage.getItem("maximum-budget").toString().replace(".", ""));
        let new_porcentaje = (total * 100) / presupuesto_int;
        $('.progress-bar').css('width', new_porcentaje+'%').attr('aria-valuenow', total);
    }
}
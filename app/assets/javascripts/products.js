const maxQuantity = 10;
const defaultMessage = '1 Un.';

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
        let presupuesto_int = parseInt(localStorage.getItem("maximum-budget").toString().replace(".", ""))
        let new_porcentaje = (total * 100) / presupuesto_int
        $('.progress-bar').css('width', new_porcentaje+'%').attr('aria-valuenow', total);
    });
    // clear the cart
    // TODO no remueve el item del local storage
    $('#clearCart').click(() => {
        localStorage.removeItem('cart-items');
    });
});
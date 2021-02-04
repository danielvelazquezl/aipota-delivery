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
    $('.addQuantityButton').click(() => {
        let spanElement = getSpanElement(this.activeElement.id);
        let spanValue = getElementValue(spanElement);
        // if the spanValue is less than 'maxQuantity' add 1
        spanValue < maxQuantity && spanElement.html(++spanValue);
    });
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
});
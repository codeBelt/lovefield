import BaseObject from 'structurejs/BaseObject';
import EventBroker from 'structurejs/event/EventBroker';

import CartEvent from '../events/CartEvent';
import DatabaseService from '../services/DatabaseService';

/**
 * Action class help facilitate passing data to the {{#crossLink "EventBroker"}}{{/crossLink}}(Global Dispatcher).
 * Pertains to the Flux Architecture Lifecycle.
 *
 * @class CartAction
 * @extends BaseObject
 * @constructor
 **/
class CartAction extends BaseObject {

    constructor() {
        super();
    }

    /**
     * Loads an array of {{#crossLink "CartGroupProductModel"}}{{/crossLink}}'s and then dispatches an event with that data.
     * The {{#crossLink "CartStore"}}{{/crossLink}} is listening for the event.
     *
     * @method load
     * @public
     */
    load() {
        DatabaseService
            .getCartProductModels()
            .then((cartProductModels) => EventBroker.dispatchEvent(CartEvent.LOAD, cartProductModels));
    }

    /**
     * Adds one or more products to the {{#crossLink "CartStore"}}{{/crossLink}} by passing the product id.
     *
     * @method addProduct
     * @param productId {number}
     * @public
     */
    addProduct(productId) {
        DatabaseService
            .addProductToCart(productId)
            .then(this.load());
    }

    /**
     *
     * @method removeCartItem
     * @public
     */
    removeCartItem(cartProductModel) {
        const cartId = cartProductModel.cart.id;

        DatabaseService
            .removeProductFromCart(cartId)
            .then(EventBroker.dispatchEvent(CartEvent.REMOVE, cartProductModel));
    }

    /**
     * Updates the quantity of a product that is in the {{#crossLink "CartStore"}}{{/crossLink}}.
     *
     * @method updateQuantity
     * @public
     */
    updateQuantity(cartId, qty) {
        return DatabaseService
            .updateProductQuantity(cartId, qty)
            .then(EventBroker.dispatchEvent(CartEvent.UPDATE_QTY, {cartId: cartId, qty: qty}));
    }

}

export default new CartAction();

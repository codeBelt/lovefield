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
            .getCartData()
            .then((models) => EventBroker.dispatchEvent(CartEvent.LOAD, models));
    }

    /**
     * Adds one or more products to the {{#crossLink "CartStore"}}{{/crossLink}} by passing the product id.
     *
     * @method addProduct
     * @param productId {number}
     * @public
     */
    addProduct(productId) {
        console.log("productId", productId);
        DatabaseService
            .addProductToCart(productId)
            .then((results) => {
            console.log("results", results);
                //this.load();
            });
    }

    /**
     * Removes one or more products from the {{#crossLink "CartStore"}}{{/crossLink}}.
     *
     * @method removeProducts
     * @public
     */
    removeProducts(models) {
        DatabaseService
            .removeProductFromCart(models)
            .then((results) => {
                this.load();
            });
    }

    /**
     * Removes all the groups and products from the {{#crossLink "CartStore"}}{{/crossLink}}.
     *
     * @method removeAll
     * @public
     */
    removeAll() {
        DatabaseService
            .removeAllFromCart()
            .then((results) => {
                this.load();
            });
    }

    /**
     * Updates the quantity of a product that is in the {{#crossLink "CartStore"}}{{/crossLink}}.
     *
     * @method updateQuantity
     * @param model {GroupProductQtyModel}
     * @public
     */
    updateQuantity(model) {
        DatabaseService
            .updateProductQuantity(model)
            .then((results) => {
                EventBroker.dispatchEvent(CartEvent.UPDATE_ITEM, model);
            });
    }

}

export default new CartAction();

import BaseEvent from 'structurejs/event/BaseEvent';

/**
 * Events that pertains to the Flux Architecture Lifecycle.
 *
 * @class CartEvent
 * @extends BaseEvent
 * @constructor
 **/
class CartEvent extends BaseEvent {

    /**
     * Event to be dispatched when the cart needs to be loaded.
     *
     * @event LOAD
     * @type {string}
     * @static
     */
    static LOAD = 'CartEvent.load';

    /**
     * Event to be dispatched when cart item needs to be removed.
     *
     * @event REMOVE
     * @type {string}
     * @static
     */
    static REMOVE = 'CartEvent.remove';

    /**
     * Event to be dispatched when
     *
     * @event UPDATE_QTY
     * @type {string}
     * @static
     */
    static UPDATE_QTY = 'CartEvent.updateQty';

    constructor(type, bubbles = false, cancelable = false, data = null) {
        super(type, bubbles, cancelable, data);
    }

}

export default CartEvent;

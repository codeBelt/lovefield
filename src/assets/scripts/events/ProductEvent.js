import BaseEvent from 'structurejs/event/BaseEvent';

/**
 * Events that pertains to the Flux Architecture Lifecycle.
 *
 * @class ProductEvent
 * @extends BaseEvent
 * @constructor
 **/
class ProductEvent extends BaseEvent {

    /**
     * Event to be dispatched when the cart needs to be loaded.
     *
     * @event LOAD
     * @type {string}
     * @static
     */
    static LOAD = 'ProductEvent.load';

    /**
     * Event to be dispatched when cart needs to be clear.
     *
     * @event CLEAR
     * @type {string}
     * @static
     */
    static CLEAR = 'ProductEvent.clear';

    constructor(type, bubbles = false, cancelable = false, data = null) {
        super(type, bubbles, cancelable, data);
    }

}

export default ProductEvent;

import BaseEvent from 'structurejs/event/BaseEvent';

/**
 * Events that pertains to the Flux Architecture Lifecycle.
 *
 * @class CategoryEvent
 * @extends BaseEvent
 * @constructor
 **/
class CategoryEvent extends BaseEvent {

    /**
     * Event to be dispatched when the cart needs to be loaded.
     *
     * @event LOAD
     * @type {string}
     * @static
     */
    static LOAD = 'CategoryEvent.load';

    /**
     * Event to be dispatched when cart needs to be clear.
     *
     * @event CLEAR
     * @type {string}
     * @static
     */
    static CLEAR = 'CategoryEvent.clear';

    constructor(type, bubbles = false, cancelable = false, data = null) {
        super(type, bubbles, cancelable, data);
    }

}

export default CategoryEvent;

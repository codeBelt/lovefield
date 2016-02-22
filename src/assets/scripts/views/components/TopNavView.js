import DOMElement from 'structurejs/display/DOMElement';

import CartStore from '../../stores/CartStore';

/**
 * TODO: YUIDoc_comment
 *
 * @class TopNavView
 * @extends DOMElement
 * @constructor
 **/
class TopNavView extends DOMElement {

    constructor() {
        super();
    }

    /**
     * @overridden DOMElement.create
     */
    create() {
        super.create();

        // Create or setup objects in this parent class.
    }

    /**
     * @overridden DOMElement.enable
     */
    enable() {
        if (this.isEnabled === true) {
            return;
        }

        // Enable the child objects and/or add any event listeners.

        super.enable();
    }

    /**
     * @overridden DOMElement.disable
     */
    disable() {
        if (this.isEnabled === false) {
            return;
        }

        // Disable the child objects and/or remove any event listeners.

        super.disable();
    }

    /**
     * @overridden DOMElement.layout
     */
    layout() {
        console.log("CartStore", CartStore.getAll());
    }

    /**
     * @overridden DOMElement.destroy
     */
    destroy() {
        this.disable();

        // Call destroy on any child objects.
        // This super method will also null out your properties for garbage collection.

        super.destroy();
    }

}

export default TopNavView;

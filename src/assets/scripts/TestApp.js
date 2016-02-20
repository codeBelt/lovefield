import Stage from 'structurejs/display/Stage';
import NavigationView from './view/NavigationView';
import LoginView from './view/LoginView';

/**
 * TODO: YUIDoc_comment
 *
 * @class TestApp
 * @extends Stage
 * @constructor
 **/
class TestApp extends Stage {

    constructor() {
        super();
    }

    /**
     * @overridden DOMElement.create
     */
    create() {
        super.create();

        $.get( "assets/data/products.json", (data) => {
           console.log("data", data);
        });
    }

    /**
     * @overridden DOMElement.enable
     */
    enable() {
        if (this.isEnabled === true) { return; }

        // Enable the child objects and/or add any event listeners.

        super.enable();
    }

    /**
     * @overridden DOMElement.disable
     */
    disable() {
        if (this.isEnabled === false) { return; }

        // Disable the child objects and/or remove any event listeners.

        super.disable();
    }

    /**
     * @overridden DOMElement.layout
     */
    layout() {
        // Layout or update the objects in this parent class.
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

export default TestApp;

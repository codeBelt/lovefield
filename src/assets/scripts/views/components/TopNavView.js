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

    /**
     * TODO: YUIDoc_comment
     *
     * @property _$cartCount
     * @type {jQuery}
     * @protected
     */
    _$cartCount = null;

    constructor($element) {
        super($element);
    }

    /**
     * @overridden DOMElement.create
     */
    create() {
        super.create();

        this._$cartCount = this.$element.find('.js-topNavView-cartCount');
    }

    /**
     * @overridden DOMElement.enable
     */
    enable() {
        if (this.isEnabled === true) { return; }
console.log("layout");
        CartStore.addEventListener(CartStore.CHANGE_EVENT, this._onStoreChange, this);

        super.enable();
    }

    /**
     * @overridden DOMElement.disable
     */
    disable() {
        if (this.isEnabled === false) { return; }

        CartStore.removeEventListener(CartStore.CHANGE_EVENT, this._onStoreChange, this);

        super.disable();
    }

    /**
     * @overridden DOMElement.layout
     */
    layout() {
        console.log("CartStore.getCount()", CartStore.getCount());
        this._$cartCount.text(CartStore.getCount());
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

    //////////////////////////////////////////////////////////////////////////////////
    // EVENT HANDLERS
    //////////////////////////////////////////////////////////////////////////////////

    /**
     * TODO: YUIDoc_comment
     *
     * @method _onStoreChange
     * @protected
     */
    _onStoreChange(event) {
        console.log("_onStoreChange");
        this.layout();
    }

}

export default TopNavView;

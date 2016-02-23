import DOMElement from 'structurejs/display/DOMElement';
import TemplateFactory from 'structurejs/util/TemplateFactory';

import CartStore from '../stores/CartStore';

/**
 * TODO: YUIDoc_comment
 *
 * @class CartView
 * @extends DOMElement
 * @constructor
 **/
class CartView extends DOMElement {

    /**
     * TODO: YUIDoc_comment
     *
     * @property _$productListContainer
     * @type {jQuery}
     * @protected
     */
    _$productListContainer = null;

    constructor() {
        super();
    }

    /**
     * @overridden DOMElement.create
     */
    create() {
        super.create('templates/precompile/views/CartView');

        this._$productListContainer = this.$element.find('.js-cartView-list');
    }

    /**
     * @overridden DOMElement.enable
     */
    enable() {
        if (this.isEnabled === true) { return; }

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
        if (CartStore.getCount() > 0) {
            const html = TemplateFactory.create('templates/precompile/CartItem', CartStore.getAll());

            this._$productListContainer.html(html);
        }
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
    // HELPER METHOD
    //////////////////////////////////////////////////////////////////////////////////

    /**
     * TODO: YUIDoc_comment
     *
     * @method update
     * @public
     */
    update(routerEvent) {
        //console.log("routerEvent", routerEvent);
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
        this.layout();
    }

}

export default CartView;

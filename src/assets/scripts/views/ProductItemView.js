import DOMElement from 'structurejs/display/DOMElement';
import TemplateFactory from 'structurejs/util/TemplateFactory';
import Router from 'structurejs/controller/Router';

import ProductAction from '../actions/ProductAction';
import CartAction from '../actions/CartAction';
import ProductStore from '../stores/ProductStore';

/**
 * TODO: YUIDoc_comment
 *
 * @class ProductItemView
 * @extends DOMElement
 * @constructor
 **/
class ProductItemView extends DOMElement {

    constructor() {
        super();
    }

    /**
     * @overridden DOMElement.create
     */
    create() {
        super.create();
    }

    /**
     * @overridden DOMElement.enable
     */
    enable() {
        if (this.isEnabled === true) { return; }

        ProductStore.addEventListener(ProductStore.CHANGE_EVENT, this._onStoreChange, this);

        this.$element.addEventListener('click', '.js-productItemView-addBtn', this._onClickAddToCart, this);

        super.enable();
    }

    /**
     * @overridden DOMElement.disable
     */
    disable() {
        if (this.isEnabled === false) { return; }

        ProductStore.removeEventListener(ProductStore.CHANGE_EVENT, this._onStoreChange, this);

        this.$element.removeEventListener('click', '.js-productItemView-addBtn', this._onClickAddToCart, this);

        super.disable();
    }

    /**
     * @overridden DOMElement.layout
     */
    layout() {
        if (ProductStore.getCount() > 0) {
            const html = TemplateFactory.create('templates/precompile/views/ProductItemView', ProductStore.getAll()[0]);

            this.$element.html(html);
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
        const productId = Number(routerEvent.params[0]);

        ProductAction.showProductById(productId);
    }

    //////////////////////////////////////////////////////////////////////////////////
    // EVENT HANDLERS
    //////////////////////////////////////////////////////////////////////////////////

    /**
     * TODO: YUIDoc_comment
     *
     * @method _onClickAddToCart
     * @param event {jQueryEventObject}
     * @protected
     */
    _onClickAddToCart(event) {
        event.preventDefault();

        const $currentTarget = $(event.currentTarget);
        const productId = $currentTarget.data('product-id');

        CartAction.addProduct(productId);

        Router.navigateTo('/cart/');
    }

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

export default ProductItemView;

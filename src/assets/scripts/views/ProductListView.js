import DOMElement from 'structurejs/display/DOMElement';
import TemplateFactory from 'structurejs/util/TemplateFactory';

import MenuView from '../views/components/MenuView';
import ProductStore from '../stores/ProductStore';
import ProductAction from '../actions/ProductAction';
import CategoryStore from '../stores/CategoryStore';

/**
 * TODO: YUIDoc_comment
 *
 * @class ProductListView
 * @extends DOMElement
 * @constructor
 **/
class ProductListView extends DOMElement {

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
        super.create('templates/precompile/views/ProductListView');

        this._$productListContainer = this.$element.find('.js-productListView-list');

        const menuView = new MenuView(this.$element.find('.js-menuView'));
        this.addChild(menuView);
    }

    /**
     * @overridden DOMElement.enable
     */
    enable() {
        if (this.isEnabled === true) { return; }

        ProductStore.addEventListener(ProductStore.CHANGE_EVENT, this._onStoreChange, this);

        this.$element.addEventListener('click', '.js-productListView-addBtn', this._onClickAddToCart, this);

        super.enable();
    }

    /**
     * @overridden DOMElement.disable
     */
    disable() {
        if (this.isEnabled === false) { return; }

        ProductStore.removeEventListener(ProductStore.CHANGE_EVENT, this._onStoreChange, this);

        this.$element.removeEventListener('click', '.js-productListView-addBtn', this._onClickAddToCart, this);

        super.disable();
    }

    /**
     * @overridden DOMElement.layout
     */
    layout() {
        if (ProductStore.getCount() > 0) {
            const html = TemplateFactory.create('templates/precompile/ProductItem', ProductStore.getAll());

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
        const categoryUrl = routerEvent.params[0];

        if (categoryUrl) {
            ProductAction.showProductsForCategory(categoryUrl);
        } else {
            ProductAction.load();
        }
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

        console.log("productId", productId);
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

export default ProductListView;

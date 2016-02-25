import DOMElement from 'structurejs/display/DOMElement';
import TemplateFactory from 'structurejs/util/TemplateFactory';
import NumberUtil from 'structurejs/util/NumberUtil';

import CartStore from '../stores/CartStore';
import CartAction from '../actions/CartAction';

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
     * @property _$cartListContainer
     * @type {jQuery}
     * @protected
     */
    _$cartListContainer = null;

    /**
     * TODO: YUIDoc_comment
     *
     * @property _$cartTotal
     * @type {jQuery}
     * @protected
     */
    _$cartTotal = null;

    constructor() {
        super();
    }

    /**
     * @overridden DOMElement.create
     */
    create() {
        super.create('templates/precompile/views/CartView');

        this._$cartListContainer = this.$element.find('.js-cartView-list');
        this._$cartTotal = this.$element.find('.js-cartTotal-total');
    }

    /**
     * @overridden DOMElement.enable
     */
    enable() {
        if (this.isEnabled === true) { return; }

        CartStore.addEventListener(CartStore.CHANGE_EVENT, this._onStoreChange, this);

        this.$element.addEventListener('click', '.js-cartItemQuantity', this._onQuantityChange, this);
        this.$element.addEventListener('click', '.js-cartItemRemoveBtn', this._onRemoveCartItem, this);

        super.enable();
    }

    /**
     * @overridden DOMElement.disable
     */
    disable() {
        if (this.isEnabled === false) { return; }

        CartStore.removeEventListener(CartStore.CHANGE_EVENT, this._onStoreChange, this);

        this.$element.removeEventListener('click', '.js-cartItemQuantity', this._onQuantityChange, this);
        this.$element.removeEventListener('click', '.js-cartItemRemoveBtn', this._onRemoveCartItem, this);

        super.disable();
    }

    /**
     * @overridden DOMElement.layout
     */
    layout() {
        const models = CartStore.getAll();

        const html = TemplateFactory.create('templates/precompile/CartItem', models);
        this._$cartListContainer.html(html);

        this._updateTotal();
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

    /**
     * TODO: YUIDoc_comment
     *
     * @method _updateTotal
     * @protected
     */
    _updateTotal() {
        const cartTotal = CartStore.getCartTotal();
        const totalCurrency = NumberUtil.formatUnit(cartTotal, 2, '.', ',', '$');

        this._$cartTotal.text(totalCurrency);
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

    /**
     * TODO: YUIDoc_comment
     *
     * @method _onRemoveCartItem
     * @protected
     */
    _onRemoveCartItem(event) {
        const $currentTarget = $(event.currentTarget);
        const cartId = parseInt($currentTarget.data('cart-id'));
        const cartProductModel = CartStore.getModelByCartId(cartId);

        CartAction.removeCartItem(cartProductModel);
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method _onQuantityChange
     * @protected
     */
    _onQuantityChange(event) {
        const $currentTarget = $(event.currentTarget);
        const cartId = parseInt($currentTarget.data('cart-id'));
        const cartProductModel = CartStore.getModelByCartId(cartId);

        cartProductModel.cart.qty =  parseInt($currentTarget.val());

        CartAction
            .updateQuantity(cartProductModel)
            .then(() => {
                const totalCurrency = NumberUtil.formatUnit(cartProductModel.getSubtotal(), 2, '.', ',', '$');

                $currentTarget
                    .closest('.js-cartItem')
                    .find('.js-cartItemSubTotal')
                    .text(totalCurrency);

                this._updateTotal();
            });
    }

}

export default CartView;

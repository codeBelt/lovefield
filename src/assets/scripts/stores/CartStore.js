import EventDispatcher from 'structurejs/event/EventDispatcher';
import EventBroker from 'structurejs/event/EventBroker';
import Collection from 'structurejs/model/Collection';

import CartEvent from '../events/CartEvent';

/**
 * A Singleton store container that maintains state & logic for a data set.
 * Pertains to the Flux Architecture Lifecycle.
 *
 * @class CartStore
 * @extends EventDispatcher
 * @constructor
 **/
class CartStore extends EventDispatcher {

    /**
     * A change event for the store to dispatch.
     *
     * @property CHANGE_EVENT
     * @type {string}
     * @public
     * @const
     */
    CHANGE_EVENT = 'CartStore.changeEvent';

    /**
     * A change event for the store to dispatch.
     *
     * @property QTY_CHANGE_EVENT
     * @type {string}
     * @public
     * @const
     */
    QTY_CHANGE_EVENT = 'CartStore.qtyChangeEvent';

    /**
     * TODO: YUIDoc_comment
     *
     * @property _storeWarehouse
     * @type {Collection}
     * @protected
     */
    _storeWarehouse = new Collection();

    constructor() {
        super();

        this.enable();
    }

    /**
     * @overridden EventDispatcher.enable
     */
    enable() {
        if (this.isEnabled === true) { return; }

        EventBroker.addEventListener(CartEvent.LOAD, this._onLoad, this);
        EventBroker.addEventListener(CartEvent.REMOVE, this._onRemove, this);
        EventBroker.addEventListener(CartEvent.UPDATE_QTY, this._onUpdateQty, this);

        super.enable();
    }

    /**
     * @overridden EventDispatcher.disable
     */
    disable() {
        if (this.isEnabled === false) { return; }

        EventBroker.removeEventListener(CartEvent.LOAD, this._onLoad, this);
        EventBroker.removeEventListener(CartEvent.REMOVE, this._onRemove, this);
        EventBroker.removeEventListener(CartEvent.UPDATE_QTY, this._onUpdateQty, this);

        super.disable();
    }

    //////////////////////////////////////////////////////////////////////////////////
    // HELPER METHOD
    //////////////////////////////////////////////////////////////////////////////////

    /**
     * Return all the models in the store.
     *
     * @method getAll
     * @return {Array<CartProductModel>}
     * @public
     */
    getAll() {
        return this._storeWarehouse.models;
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method getCartQtyTotal
     * @return {number}
     * @public
     */
    getCartQtyTotal() {
        const total = this._storeWarehouse.models.reduce((previousValue, currentValue) => {
            return previousValue + currentValue.cart.qty;
        }, 0);

        return total;
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method getCartTotal
     * @public
     */
    getCartTotal() {
        const total = this._storeWarehouse.models.reduce((previousValue, currentValue) => {
            return previousValue + currentValue.getSubtotal()
        }, 0);

        return total;
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method getModelByCartId
     * @return {CartProductModel}
     * @public
     */
    getModelByCartId(id) {
        const cartProductModel = this._storeWarehouse.models.find((cartProductModel) => {
            return cartProductModel.cart.id === id;
        });

        return cartProductModel;
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method _updateStore
     * @protected
     */
    _updateStore(data) {
        this._storeWarehouse.clear();

        this._storeWarehouse.add(data);

        this.dispatchEvent(this.CHANGE_EVENT);
    }

    //////////////////////////////////////////////////////////////////////////////////
    // EVENT HANDLERS
    //////////////////////////////////////////////////////////////////////////////////

    /**
     * TODO: YUIDoc_comment
     *
     * @method _onLoad
     * @param event {CartEvent}
     * @protected
     */
    _onLoad(event) {
        const cartProductModels = event.data;

        this._updateStore(cartProductModels);
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method _onRemove
     * @protected
     */
    _onRemove(event) {
        const cartProductModel = event.data;

        this._storeWarehouse.remove(cartProductModel);

        this.dispatchEvent(this.CHANGE_EVENT);
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method _onUpdateQty
     * @protected
     */
    _onUpdateQty(event) {
        const cartId = event.data.cartId;
        const qty = event.data.qty;

        const cartProductModel = this.getModelByCartId(cartId);
        cartProductModel.cart.qty = qty;

        this.dispatchEvent(this.QTY_CHANGE_EVENT);
    }

}

export default new CartStore();

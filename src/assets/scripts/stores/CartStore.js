import EventDispatcher from 'structurejs/event/EventDispatcher';
import EventBroker from 'structurejs/event/EventBroker';
import Collection from 'structurejs/model/Collection';

import CartEvent from '../events/CartEvent';
import ProductModel from '../models/ProductModel';

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
        EventBroker.addEventListener(CartEvent.CLEAR, this._onClear, this);

        super.enable();
    }

    /**
     * @overridden EventDispatcher.disable
     */
    disable() {
        if (this.isEnabled === false) { return; }

        EventBroker.removeEventListener(CartEvent.LOAD, this._onLoad, this);
        EventBroker.removeEventListener(CartEvent.CLEAR, this._onClear, this);

        super.disable();
    }

    //////////////////////////////////////////////////////////////////////////////////
    // HELPER METHOD
    //////////////////////////////////////////////////////////////////////////////////

    /**
     * Return all the models in the store.
     *
     * @method getAll
     * @return {Array<ProductModel>}
     * @public
     */
    getAll() {
        return this._storeWarehouse.models;
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method getAll
     * @return {number}
     * @public
     */
    getCount() {
        return this._storeWarehouse.length;
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
        const productModels = event.data;

        this._updateStore(productModels);
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method _onClear
     * @param event {CartEvent}
     * @protected
     */
    _onClear(event) {
        this._updateStore(null);
    }

}

export default new CartStore();

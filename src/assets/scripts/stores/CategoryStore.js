import EventDispatcher from 'structurejs/event/EventDispatcher';
import EventBroker from 'structurejs/event/EventBroker';
import Collection from 'structurejs/model/Collection';

import CategoryEvent from '../events/CategoryEvent';

/**
 * A Singleton store container that maintains state & logic for a data set.
 * Pertains to the Flux Architecture Lifecycle.
 *
 * @class CategoryStore
 * @extends EventDispatcher
 * @constructor
 **/
class CategoryStore extends EventDispatcher {

    /**
     * A change event for the store to dispatch.
     *
     * @property CHANGE_EVENT
     * @type {string}
     * @public
     * @const
     */
    CHANGE_EVENT = 'CategoryStore.changeEvent';

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

        EventBroker.addEventListener(CategoryEvent.LOAD, this._onLoad, this);
        EventBroker.addEventListener(CategoryEvent.CLEAR, this._onClear, this);

        super.enable();
    }

    /**
     * @overridden EventDispatcher.disable
     */
    disable() {
        if (this.isEnabled === false) { return; }

        EventBroker.removeEventListener(CategoryEvent.LOAD, this._onLoad, this);
        EventBroker.removeEventListener(CategoryEvent.CLEAR, this._onClear, this);

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
    getCount():number {
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
     * @param event {CategoryEvent}
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
     * @param event {CategoryEvent}
     * @protected
     */
    _onClear(event) {
        this._updateStore(null);
    }

}

export default new CategoryStore();

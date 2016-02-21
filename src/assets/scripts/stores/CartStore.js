import Collection from 'structurejs/model/Collection';
import EventBroker from 'structurejs/event/EventBroker';

import LanguageStore from '../stores/LanguageStore';
import CartEvent from '../events/CartEvent';
import ProductModel from '../models/ProductModel';
import CartGroupProductModel from '../models/cart/CartGroupProductModel';
import CartDatabaseService from '../services/database/CartDatabaseService';
import LanguageModel from '../models/language/LanguageModel';
import GroupProductQtyModel from '../models/cart/GroupProductQtyModel';

/**
 * A Singleton store container that maintains state & logic for a data set.
 * Pertains to the Flux Architecture Lifecycle.
 *
 * @class CartStore
 * @extends Collection
 * @constructor
 **/
class CartStore extends Collection {

    /**
     * A change event for the store to dispatch.
     *
     * @property CHANGE_EVENT
     * @type {string}
     * @public
     * @const
     */
    public CHANGE_EVENT:string = 'CartStore.changeEvent';

    /**
     * TODO: YUIDoc_comment
     *
     * @property _count
     * @type {number}
     * @protected
     */
    protected _count:number = 0;

    constructor() {
        super(CartGroupProductModel);

        this.enable();
    }

    /**
     * @overridden Collection.enable
     */
    public enable():void {
        if (this.isEnabled === true) { return; }

        EventBroker.addEventListener(CartEvent.LOAD, this._onLoad, this);
        EventBroker.addEventListener(CartEvent.UPDATE_ITEM, this._onUpdateCartItem, this);

        super.enable();
    }

    /**
     * @overridden Collection.disable
     */
    public disable():void {
        if (this.isEnabled === false) { return; }

        EventBroker.removeEventListener(CartEvent.LOAD, this._onLoad, this);
        EventBroker.removeEventListener(CartEvent.UPDATE_ITEM, this._onUpdateCartItem, this);

        super.disable();
    }

    //////////////////////////////////////////////////////////////////////////////////
    // HELPER METHOD
    //////////////////////////////////////////////////////////////////////////////////

    /**
     * Return all the models in the store.
     *
     * @method getAll
     * @return {Array<CartGroupProductModel>}
     * @public
     */
    public getAll():Array<CartGroupProductModel> {
        return this.models;
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method getCount
     * @return {number}
     * @public
     */
    public getCount():number {
        return this._count;
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method findByProductId
     * @param id {number}
     * @return {ProductModel}
     * @public
     */
    public findByProductId(id:number):ProductModel {
        let productModel:ProductModel;

        for (let i:number = 0; i < this.length; i++) {
            productModel = this.models[i].findByProductId(id);

            if (productModel) {
                return productModel;
            }
        }
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method _updateStore
     * @protected
     */
    protected _updateStore(list:Array<CartGroupProductModel>):void {
        this.clear();

        this.add(list);

        const languageModel:LanguageModel = LanguageStore.getLanguage();

        let model:CartGroupProductModel;
        for (let i:number = 0; i < this.length; i++) {
            model = this.models[i];
            if (model.cartGroup.name === CartDatabaseService.SINGLE_PRODUCTS_GROUP_NAME) {
                model.cartGroup.name = languageModel.singleProductGroupName;
                // remove single product group so it can
                // be added at the end of the model list.
                this.remove(model);

                break;
            }
        }

        // re-add single product group model at the end of the model list.
        if (model != null) {
            this.add(model);
        }

        this._generatedCount();

        this.dispatchEvent(this.CHANGE_EVENT);
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method _generatedCount
     * @protected
     */
    protected _generatedCount():void {
        this._count = 0;

        for (var i:number = 0; i < this.length; i++) {
            this._count += this.models[i].products.length;
        }
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
    protected _onLoad(event:CartEvent):void {
        const models:Array<CartGroupProductModel> = event.data;

        this._updateStore(models);
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method _onUpdateCartItem
     * @protected
     */
    protected _onUpdateCartItem(event:CartEvent):void {
        const groupProductQtyModel:GroupProductQtyModel = event.data;

        let cartGroupProductModel:CartGroupProductModel;
        let product:ProductModel;
        for (let i:number = 0; i < this.length; i++) {
            cartGroupProductModel = this.get(i);

            if (cartGroupProductModel.cartGroup.id === groupProductQtyModel.cartGroupId) {
                product = cartGroupProductModel.findByProductId(groupProductQtyModel.productId);
                product.cartQuantity = groupProductQtyModel.qty;
            }
        }
    }
}

export default new CartStore();

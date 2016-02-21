import BaseObject from 'structurejs/BaseObject';
import EventBroker from 'structurejs/event/EventBroker';

import ProductModel from '../models/ProductModel';
import ProductEvent from '../events/ProductEvent';
import DatabaseService from '../services/DatabaseService';
import CategoryAction from '../actions/CategoryAction';

/**
 * Action class help facilitate passing data to the {{#crossLink "EventBroker"}}{{/crossLink}}(Global Dispatcher).
 * Pertains to the Flux Architecture Lifecycle.
 *
 * @class ProductAction
 * @extends BaseObject
 * @constructor
 **/
class ProductAction extends BaseObject {

    constructor() {
        super();
    }

    /**
     * Loads an array of {{#crossLink "ProductModel"}}{{/crossLink}}'s and then dispatches an event with that data.
     * The {{#crossLink "ProductStore"}}{{/crossLink}} is listening for the event.
     *
     * @method load
     * @public
     */
    load() {
        DatabaseService
            .getAllProducts()
            .then((productModels) => {
                if (productModels.length > 0) {
                    // Tells the store to load these products.
                    EventBroker.dispatchEvent(ProductEvent.LOAD, productModels);

                    CategoryAction.load();
                } else {
                    // Gets the products data from the backend/api.
                    $.get( "assets/data/products.json", (data) => this._onSuccess(data));
                }
            });
    }

    /**
     * Action to tell the {{#crossLink "ProductStore"}}{{/crossLink}} clear out all of its data.
     *
     * @method clear
     * @public
     */
    clear() {
        EventBroker.dispatchEvent(ProductEvent.CLEAR);
    }

    /**
     * Action to search for the product that matches the data passed in.
     * Then passes that data to the {{#crossLink "ProductStore"}}{{/crossLink}} via an event being dispatched.
     *
     * @method searchFor
     * @param searchModel {SearchModel}
     * @public
     */
    searchFor(searchModel) {
        //DatabaseService
        //    .getProductsSearch(searchModel)
        //    .then((productModels) => {
        //        EventBroker.dispatchEvent(ProductEvent.SEARCH, productModels);
        //    });
    }

    /**
     * Action to load products for a specific category.
     * Then passes that data to the {{#crossLink "ProductStore"}}{{/crossLink}} via an event being dispatched.
     *
     * @method showProductsForCategory
     * @param categoryId {string}
     * @public
     */
    showProductsForCategory(categoryId) {
        //DatabaseService
        //    .getProductsForCategory(categoryId)
        //    .then((productModels) => {
        //        EventBroker.dispatchEvent(ProductEvent.CATEGORY, productModels);
        //    });
    }

    /**
     * Action to load a product by the passed in product id.
     * Then passes that data to the {{#crossLink "ProductStore"}}{{/crossLink}} via an event being dispatched.
     *
     * @method showProductById
     * @param productId {number}
     * @public
     */
    showProductById(productId) {
        DatabaseService
            .getProductById(productId)
            .then((productModel) =>  EventBroker.dispatchEvent(ProductEvent.LOAD, productModel));
    }

    /**
     * When the RequestService.{{#crossLink "RequestService/get:method"}}{{/crossLink}} method was successful
     * this method is called.
     *
     * @method _onSuccess
     * @param data {any}
     * @protected
     */
    _onSuccess(data) {
        const jsonData = (typeof data !== 'string') ? data : JSON.parse(data);

        const productModels = jsonData.products.map((item) => new ProductModel(item));

        //Save the product models to the local database where there id's get updated.
        DatabaseService
            .saveProducts(productModels)
            .then((savedProductModels) => {
                EventBroker.dispatchEvent(ProductEvent.LOAD, savedProductModels);

                CategoryAction.load();
            });
    }

}

export default new ProductAction();

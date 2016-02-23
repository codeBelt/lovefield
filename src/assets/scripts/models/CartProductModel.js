import BaseModel from 'structurejs/model/BaseModel';
import StringUtil from 'structurejs/util/StringUtil';

import ProductModel from './ProductModel';
import CartModel from './CartModel';

/**
 * TODO: YUIDoc_comment
 *
 * @class CartProductModel
 * @extends BaseModel
 * @constructor
 **/
class CartProductModel extends BaseModel {

    /**
     * TODO: YUIDoc_comment
     *
     * @property product
     * @type {ProductModel}
     * @public
     */
    product = ProductModel;

    /**
     * TODO: YUIDoc_comment
     *
     * @property cart
     * @type {CartModel}
     * @public
     */
    cart = CartModel;


    constructor(data) {
        super();

        if (data) {
            this.update(data);
        }
    }

    /**
     * @overridden BaseModel.update
     */
    update(data) {
        super.update(data);

        // Override any values after the default super update method has set the values.
    }

}

export default CartProductModel;

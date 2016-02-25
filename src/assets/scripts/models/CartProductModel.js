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

    /**
     * Application only property to help with logic.
     *
     * @property subTotal
     * @type {number}
     * @public
     */
    subTotal = 0;

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

        this.subTotal = this.getSubtotal();
    }

    //////////////////////////////////////////////////////////////////////////////////
    // HELPER METHOD
    //////////////////////////////////////////////////////////////////////////////////

    /**
     * TODO: YUIDoc_comment
     *
     * @method getSubtotal
     * @public
     */
    getSubtotal() {
        const subTotal = this.product.price * this.cart.qty;

        return Number(subTotal.toFixed(2));
    }

}

export default CartProductModel;

import BaseModel from 'structurejs/model/BaseModel';

/**
 * TODO: YUIDoc_comment
 *
 * @class ProductModel
 * @extends BaseModel
 * @constructor
 **/
class ProductModel extends BaseModel {

    /**
     * @property productId
     * @type {number}
     * @protected
     */
    productId = -1;

    /**
     * @property company
     * @type {string}
     * @public
     */
    company = '';

    /**
     * @property category
     * @type {string}
     * @public
     */
    category = '';

    /**
     * @property type
     * @type {string}
     * @public
     */
    type = '';

    /**
     * @property price
     * @type {number}
     * @public
     */
    price = 0;

    /**
     * @property image
     * @type {string}
     * @public
     */
    image = '';

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

export default ProductModel;

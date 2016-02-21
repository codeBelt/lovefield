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
     * @property id
     * @type {number}
     * @protected
     */
    id = null;

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

        this.id = data.productId;
    }

}

export default ProductModel;

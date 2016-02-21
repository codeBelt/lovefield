import BaseModel from 'structurejs/model/BaseModel';
import StringUtil from 'structurejs/util/StringUtil';

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
     * @property categoryUrl
     * @type {string}
     * @public
     */
    categoryUrl = '';

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

        // The client-side local database id.
        this.id = data.productId;

        // Turns the category name in a nice looking url.
        this.categoryUrl = StringUtil.toSentence(data.category, '-');
    }

}

export default ProductModel;

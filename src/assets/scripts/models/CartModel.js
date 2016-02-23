import BaseModel from 'structurejs/model/BaseModel';

/**
 * TODO: YUIDoc_comment
 *
 * @class CategoryModel
 * @extends BaseModel
 * @constructor
 **/
class CategoryModel extends BaseModel {

    /**
     * @property id
     * @type {number}
     * @protected
     */
    id = null;

    /**
     * @property qty
     * @type {number}
     * @protected
     */
    qty = 0;

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
        this.id = data.cartId;
    }

}

export default CategoryModel;

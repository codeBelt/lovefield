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

export default CategoryModel;

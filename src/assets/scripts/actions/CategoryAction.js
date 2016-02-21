import BaseObject from 'structurejs/BaseObject';
import EventBroker from 'structurejs/event/EventBroker';

import CategoryEvent from '../events/CategoryEvent';
import DatabaseService from '../services/DatabaseService';

/**
 * Action class help facilitate passing data to the {{#crossLink "EventBroker"}}{{/crossLink}}(Global Dispatcher).
 * Pertains to the Flux Architecture Lifecycle.
 *
 * @class CategoryAction
 * @extends BaseObject
 * @constructor
 **/
class CategoryAction extends BaseObject {

    constructor() {
        super();
    }

    /**
     *
     * @method load
     * @public
     */
    load() {
        DatabaseService
            .getCategories()
            .then((categoryList) => {
                EventBroker.dispatchEvent(CategoryEvent.LOAD, categoryList);
            });
    }

}

export default new CategoryAction();

import DOMElement from 'structurejs/display/DOMElement';
import TemplateFactory from 'structurejs/util/TemplateFactory';

import MenuView from '../views/components/MenuView';
import ProductStore from '../stores/ProductStore';
import ProductAction from '../actions/ProductAction';
import CartAction from '../actions/CartAction';
import CategoryStore from '../stores/CategoryStore';

/**
 * TODO: YUIDoc_comment
 *
 * @class IndexView
 * @extends DOMElement
 * @constructor
 **/
class IndexView extends DOMElement {

    constructor() {
        super();
    }

    /**
     * @overridden DOMElement.create
     */
    create() {
        super.create('templates/precompile/views/IndexView');

        const menuView = new MenuView(this.$element.find('.js-menuView'));
        this.addChild(menuView);
    }

    //////////////////////////////////////////////////////////////////////////////////
    // HELPER METHOD
    //////////////////////////////////////////////////////////////////////////////////

    /**
     * TODO: YUIDoc_comment
     *
     * @method update
     * @public
     */
    update(routerEvent) {
        ProductAction.load();
    }

}

export default IndexView;

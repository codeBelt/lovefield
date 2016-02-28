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
 * @class SearchResultsView
 * @extends DOMElement
 * @constructor
 **/
class SearchResultsView extends DOMElement {

    /**
     * TODO: YUIDoc_comment
     *
     * @property _$searchListContainer
     * @type {jQuery}
     * @protected
     */
    _$searchListContainer = null;

    constructor() {
        super();
    }

    /**
     * @overridden DOMElement.create
     */
    create() {
        super.create('templates/precompile/views/SearchResultsView');

        this._$searchListContainer = this.$element.find('.js-searchResultsView-list');
    }

    /**
     * @overridden DOMElement.enable
     */
    enable() {
        if (this.isEnabled === true) { return; }

        ProductStore.addEventListener(ProductStore.CHANGE_EVENT, this._onStoreChange, this);

        super.enable();
    }

    /**
     * @overridden DOMElement.disable
     */
    disable() {
        if (this.isEnabled === false) { return; }

        ProductStore.removeEventListener(ProductStore.CHANGE_EVENT, this._onStoreChange, this);

        super.disable();
    }

    /**
     * @overridden DOMElement.layout
     */
    layout() {
        if (ProductStore.getCount() > 0) {
            const html = TemplateFactory.create('templates/precompile/ProductItem', ProductStore.getAll());

            this._$searchListContainer.html(html);
        } else {
            this._$searchListContainer.html('<h3>No Results</h3>');
        }
    }

    /**
     * @overridden DOMElement.destroy
     */
    destroy() {
        this.disable();

        // Call destroy on any child objects.
        // This super method will also null out your properties for garbage collection.

        super.destroy();
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
        const searchValue = routerEvent.query.terms;

        ProductAction.searchFor(searchValue);
    }

    //////////////////////////////////////////////////////////////////////////////////
    // EVENT HANDLERS
    //////////////////////////////////////////////////////////////////////////////////

    /**
     * TODO: YUIDoc_comment
     *
     * @method _onStoreChange
     * @protected
     */
    _onStoreChange(event) {
        this.layout();
    }

}

export default SearchResultsView;

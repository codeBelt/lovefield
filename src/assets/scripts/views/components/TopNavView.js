import DOMElement from 'structurejs/display/DOMElement';
import Router from 'structurejs/controller/Router';

import CartStore from '../../stores/CartStore';
import ProductAction from '../../actions/ProductAction';

/**
 * TODO: YUIDoc_comment
 *
 * @class TopNavView
 * @extends DOMElement
 * @constructor
 **/
class TopNavView extends DOMElement {

    /**
     * TODO: YUIDoc_comment
     *
     * @property _$cartCount
     * @type {jQuery}
     * @protected
     */
    _$cartCount = null;

    /**
     * TODO: YUIDoc_comment
     *
     * @property _$searchBtn
     * @type {jQuery}
     * @protected
     */
    _$searchBtn = null;

    /**
     * TODO: YUIDoc_comment
     *
     * @property _$searchInput
     * @type {jQuery}
     * @protected
     */
    _$searchInput = null;

    constructor($element) {
        super($element);
    }

    /**
     * @overridden DOMElement.create
     */
    create() {
        super.create();

        this._$cartCount = this.$element.find('.js-topNavView-cartCount');
        this._$searchBtn = this.$element.find('.js-topNavView-searchBtn');
        this._$searchInput = this.$element.find('.js-topNavView-searchInput')
    }

    /**
     * @overridden DOMElement.enable
     */
    enable() {
        if (this.isEnabled === true) { return; }

        CartStore.addEventListener(CartStore.CHANGE_EVENT, this._onStoreChange, this);
        CartStore.addEventListener(CartStore.QTY_CHANGE_EVENT, this._onStoreChange, this);

        this.$element.addEventListener('submit', this._onClickSearch, this);
        this._$searchBtn.addEventListener('click', this._onClickSearch, this);

        super.enable();
    }

    /**
     * @overridden DOMElement.disable
     */
    disable() {
        if (this.isEnabled === false) { return; }

        CartStore.removeEventListener(CartStore.CHANGE_EVENT, this._onStoreChange, this);
        CartStore.removeEventListener(CartStore.QTY_CHANGE_EVENT, this._onStoreChange, this);

        this.$element.removeEventListener('submit', this._onClickSearch, this);
        this._$searchBtn.removeEventListener('click', this._onClickSearch, this);

        super.disable();
    }

    /**
     * @overridden DOMElement.layout
     */
    layout() {
        this._$cartCount.text(CartStore.getCartQtyTotal());
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

    /**
     * TODO: YUIDoc_comment
     *
     * @method _onClickSearch
     * @protected
     */
    _onClickSearch(event) {
        event.preventDefault();

        let searchValue = this._$searchInput.val();
        searchValue = encodeURIComponent(searchValue);

        if (searchValue.trim().length > 0) {
            const route = `/search/?terms=${searchValue}`;
            Router.navigateTo(route);
        }
    }

}

export default TopNavView;

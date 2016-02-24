import Stage from 'structurejs/display/Stage';
import TemplateFactory from 'structurejs/util/TemplateFactory';
import Router from 'structurejs/controller/Router';

import CartAction from './actions/CartAction';
import ProductAction from './actions/ProductAction';
import ProductModel from './models/ProductModel';
import DatabaseService from './services/DatabaseService';
import ProductListView from './views/ProductListView';
import ProductItemView from './views/ProductItemView';
import CartView from './views/CartView';
import TopNavView from './views/components/TopNavView';

/**
 * TODO: YUIDoc_comment
 *
 * @class App
 * @extends Stage
 * @constructor
 **/
class App extends Stage {

    /**
     * @property _viewDictionary
     * @type {any}
     * @protected
     */
    _viewDictionary = {};

    /**
     * TODO: YUIDoc_comment
     *
     * @property _childViewContainer
     * @type {DOMElement}
     * @protected
     */
    _childViewContainer = null;

    /**
     * TODO: YUIDoc_comment
     *
     * @property _currentView
     * @type {DOMElement}
     * @protected
     */
    _currentView = null;

    constructor() {
        super();

        CartAction.load();
    }

    /**
     * @overridden DOMElement.create
     */
    create() {
        super.create();

        this._childViewContainer = this.getChild('.js-childViewContainer');

        this._topNavView = new TopNavView(this.$element.find('.js-topNavView'));
        this.addChild(this._topNavView);

        this._addRouteAndView('', ProductListView);
        this._addRouteAndView('/products/:category:', ProductListView);
        this._addRouteAndView('/product/{id}', ProductItemView);
        this._addRouteAndView('/cart/', CartView);

        Router.start();
    }

    /**
     * @overridden DOMElement.enable
     */
    enable() {
        if (this.isEnabled === true) { return; }

        super.enable();
    }

    /**
     * @overridden DOMElement.disable
     */
    disable() {
        if (this.isEnabled === false) { return; }

        super.disable();
    }

    /**
     * @overridden DOMElement.layout
     */
    layout() {
        // Layout or update the objects in this parent class.
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
     * @method _addRouteAndView
     * @protected
     */
    _addRouteAndView(routePattern, classObject) {
        this._viewDictionary[routePattern] = classObject;

        Router.add(routePattern, this._onRouteChange, this);
    }

    //////////////////////////////////////////////////////////////////////////////////
    // EVENT HANDLERS
    //////////////////////////////////////////////////////////////////////////////////


    /**
     * Handles changing the main section view determined by the route the was trigger.
     *
     * @method _onRouteChange
     * @param routerEvent {RouterEvent}
     * @privates
     */
    _onRouteChange(routerEvent) {
        // Gets the class view by the route pattern.
        const ClassObject = this._viewDictionary[routerEvent.routePattern];

        // Don't instantiate the view if it is already the current view.
        if ((this._currentView instanceof ClassObject) === false) {
            // Removes the current view.
            if (this._currentView != null) {
                this._childViewContainer.removeChild(this._currentView);
            }

            // Adds the view to the parent.
            this._currentView = new ClassObject();
            this._childViewContainer.addChild(this._currentView);
        }

        // Note: All child views should have a update method.
        this._currentView.update(routerEvent);
    }

}

export default App;

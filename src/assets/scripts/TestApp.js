import Stage from 'structurejs/display/Stage';
import TemplateFactory from 'structurejs/util/TemplateFactory';

import ProductModel from './models/ProductModel';
import DatabaseService from './services/DatabaseService';

/**
 * TODO: YUIDoc_comment
 *
 * @class TestApp
 * @extends Stage
 * @constructor
 **/
class TestApp extends Stage {

    constructor() {
        super();
    }

    /**
     * @overridden DOMElement.create
     */
    create() {
        super.create();

        $.get( "assets/data/products.json", (data) => {
            const knifeModels = data.products.map((knifeData) => {
                    return new ProductModel(knifeData);
                })

            const html = TemplateFactory.create('templates/precompile/ProductItem', knifeModels);
            this.$element.find('.js-productList').append(html);

        });



        DatabaseService
            .getDatabase()
            .then((datalist) => {
            console.log("dataList", datalist);
        })

    }

    /**
     * @overridden DOMElement.enable
     */
    enable() {
        if (this.isEnabled === true) { return; }

        this.$element.addEventListener('click', '.js-addToCart', this._onClickAddToCart, this);

        super.enable();
    }

    /**
     * @overridden DOMElement.disable
     */
    disable() {
        if (this.isEnabled === false) { return; }

        this.$element.removeEventListener('click', '.js-addToCart', this._onClickAddToCart, this);

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
    // EVENT HANDLERS
    //////////////////////////////////////////////////////////////////////////////////

    /**
     * TODO: YUIDoc_comment
     *
     * @method _onClickAddToCart
     * @param event {jQueryEventObject}
     * @protected
     */
    _onClickAddToCart(event) {
        event.preventDefault();

        const $currentTarget = $(event.currentTarget);
        const productId = $currentTarget.data('product-id');

        console.log("productId", productId);
    }

}

export default TestApp;

import DOMElement from 'structurejs/display/DOMElement';
import TemplateFactory from 'structurejs/util/TemplateFactory';

import CategoryStore from '../../stores/CategoryStore';

/**
 * TODO: YUIDoc_comment
 *
 * @class MenuView
 * @extends DOMElement
 * @constructor
 **/
class MenuView extends DOMElement {

    constructor($element) {
        super($element);
    }

    /**
     * @overridden DOMElement.create
     */
    create() {
        super.create();
    }

    /**
     * @overridden DOMElement.enable
     */
    enable() {
        if (this.isEnabled === true) { return; }

        CategoryStore.addEventListener(CategoryStore.CHANGE_EVENT, this._onStoreChange, this);

        super.enable();
    }

    /**
     * @overridden DOMElement.disable
     */
    disable() {
        if (this.isEnabled === false) { return; }

        CategoryStore.removeEventListener(CategoryStore.CHANGE_EVENT, this._onStoreChange, this);

        super.disable();
    }

    /**
     * @overridden DOMElement.layout
     */
    layout() {
        if (CategoryStore.getCount() > 0) {
            const html = TemplateFactory.create('templates/precompile/MenuItem', CategoryStore.getAll());

            this.$element.html(html);
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

export default MenuView;

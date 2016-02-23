import EventDispatcher from 'structurejs/event/EventDispatcher';
import BrowserUtil from 'structurejs/util/BrowserUtil';

import ProductModel from '../models/ProductModel';
import CategoryModel from '../models/CategoryModel';
import CartProductModel from '../models/CartProductModel';

/**
 * TODO: YUIDoc_comment
 *
 * @class DatabaseService
 * @constructor
 **/
class DatabaseService extends EventDispatcher {

    /**
     * A reference to the database.
     *
     * @property _db
     * @type {lf.Database}
     * @protected
     */
    _db = null;

    /**
     * TODO: YUIDoc_comment
     *
     * @property _databasePromise
     * @type {Promise<lf.Database>}
     * @protected
     */
    _databasePromise = null;

    constructor() {
        super();

        const schemaBuilder = lf.schema.create('LovefieldExampleDatabase', 1);

        schemaBuilder
            .createTable('Product')
            .addColumn('productId',             lf.Type.INTEGER)
            .addColumn('company',               lf.Type.STRING)
            .addColumn('category',              lf.Type.STRING)
            .addColumn('categoryUrl',           lf.Type.STRING)
            .addColumn('type',                  lf.Type.STRING)
            .addColumn('price',                 lf.Type.NUMBER)
            .addColumn('image',                 lf.Type.STRING)
            .addPrimaryKey(['productId'], true);

        schemaBuilder
            .createTable('Cart')
            .addColumn('cartId',                lf.Type.INTEGER)
            .addColumn('qty',                   lf.Type.STRING)
            .addColumn('fk_productId',          lf.Type.INTEGER)
            .addPrimaryKey(['cartId'], true);


        let storeType;

        if (BrowserUtil.isIOS() || BrowserUtil.browserName() === 'Safari') {
            storeType = lf.schema.DataStoreType.WEB_SQL;
        }
        else if (window.indexedDB) {
            storeType = lf.schema.DataStoreType.INDEXED_DB;
        }
        else {
            storeType = lf.schema.DataStoreType.MEMORY;
        }

        const connectOptions = {
            storeType: storeType,
            onUpgrade: (rawDb) => this._onUpgrade(rawDb)
        }

        this._databasePromise = new Promise((resolve, reject) => {
            schemaBuilder
                .connect(connectOptions)
                .then((db) => {
                    this._db = db;

                    resolve(this._db);
                })
        })
    }

    //////////////////////////////////////////////////////////////////////////////////
    // HELPER METHOD
    //////////////////////////////////////////////////////////////////////////////////

    /**
     * Return the database instance to other services can use it.
     *
     * @method getDatabase
     * @return {Promise<lf.Database>}
     * @public
     */
    getDatabase() {
        return this._databasePromise;
    }

    /**
     * Gets all the products.
     *
     * @method getAllProducts
     * @return {Promise<Array<ProductModel>>}
     * @public
     */
    getAllProducts() {
        return this
                .getDatabase()
                .then((db) => this._getAllProducts(db));
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method _getAllProducts
     * @protected
     */
    _getAllProducts(db) {
        const table = db.getSchema().table('Product');

        return db
            .select()
            .from(table)
            .exec()
            .then((dataList) => {
                return dataList.map((dataItem) => new ProductModel(dataItem));
            });
    }

    /**
     * Saves all the products passed and then returns them with updated id from the database.
     *
     * @method saveProducts
     * @param models {Array<ProductModel>}
     * @return {Promise<Array<ProductModel>>}
     * @public
     */
    saveProducts(models)  {
        return this
                .getDatabase()
                .then((db) => this._saveProducts(db, models));
    }

    /**
     *
     * @protected
     */
    _saveProducts(db, models)  {
        const table = db.getSchema().table('Product');

        const rows = models.map((model) => {
            return table.createRow( model.toJSON() );
        });

        return db
                .insert()
                .into(table)
                .values(rows)
                .exec()
                .then((dataList) => {
                    return dataList.map((data) => new ProductModel(data));
                });
    }

    /**
     * Gets the list of categories determined by all the products.
     *
     * @method getCategories
     * @return {Promise<Array<string>>}
     * @public
     */
    getCategories() {
        return this
                .getDatabase()
                .then((db) => this._getCategories(db));
    }

    /**
     * Gets the list of categories determined by all the products.
     *
     * @method _getCategories
     * @return {Promise<Array<string>>}
     * @protected
     */
    _getCategories(db) {
        const table = db.getSchema().table('Product');

        return db
                .select(table.category, table.categoryUrl)
                .from(table)
                .groupBy(table.category, table.categoryUrl)
                .orderBy(table.category, lf.Order.ASC)
                .exec()
                .then((dataList) => {
                    return dataList.map((data) => new CategoryModel(data));
                });
    }

    /**
     * Gets all the products by the category id that was passed in.
     *
     * @method getProductsForCategory
     * @param categoryUrl {string}
     * @return {Promise<Array<ProductModel>>}
     * @public
     */
    getProductsForCategory(categoryUrl) {
        return this
                .getDatabase()
                .then((db) => this._getProductsForCategory(db, categoryUrl));
    }

    /**
     * Gets all the products by the category id that was passed in.
     *
     * @method getProductsForCategory
     * @param categoryUrl {string}
     * @return {Promise<Array<ProductModel>>}
     * @public
     */
    _getProductsForCategory(db, categoryUrl) {
        const table = db.getSchema().table('Product');

        return db
                .select()
                .from(table)
                .where(table.categoryUrl.eq(categoryUrl))
                .exec()
                .then((dataList) => {
                    return dataList.map((data) => new ProductModel(data));
                 });
    }

    getProductById(productId) {
        return this
                .getDatabase()
                .then((db) => this._getProductById(db, productId));
    }

    /**
     * @method _getProductById
     * @public
     */
    _getProductById(db, productId) {
        const table = db.getSchema().table('Product');

        return db
                .select()
                .from(table)
                .where(table.productId.in([productId]))
                .exec()
                .then((dataList) => {
                    return new ProductModel(dataList[0]);
                });
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method addProductToCart
     * @public
     */
    addProductToCart(productId) {
        return this
                .getDatabase()
                .then((db) => this._addProductToCart(db, productId));
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method _addProductToCart
     * @public
     */
    _addProductToCart(db, productId) {
        const table = db.getSchema().table('Cart');

        const row = table.createRow({
            fk_productId: productId,
            qty: 1
        });

        return this
            ._db
            .insert()
            .into(table)
            .values([row])
            .exec();
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method getCartProductModels
     * @public
     */
    getCartProductModels() {
        return this
                .getDatabase()
                .then((db) => this._getCartProductModels(db));
    }

    _getCartProductModels(db) {
        const productTable = db.getSchema().table('Product');
        const cartTable = db.getSchema().table('Cart');

        return db
            .select()
            .from(productTable)
            .innerJoin(cartTable, productTable.productId.eq(cartTable.fk_productId))
            .exec()
            .then((dataList) => {
                return dataList.map((data) => {
                    const model = new CartProductModel({
                        product: data.Product,
                        cart: data.Cart
                    });

                    return model;
                });
            });
    }

    //////////////////////////////////////////////////////////////////////////////////
    // UPGRADE
    //////////////////////////////////////////////////////////////////////////////////

    /**
     * Helper method to update the database schema when something has changed.
     *
     * @method _onUpgrade
     * @param rawDb {lf.raw.BackStore}
     * @protected
     */
    _onUpgrade(rawDb) {
        const databaseVersion = rawDb.getVersion();
        //https://github.com/google/lovefield/blob/master/docs/spec/03_life_of_db.md#33-database-upgrade

        console.log('databaseVersion', databaseVersion);

        let promises = [];

        //// Add column agent (type string) to Purchase with default value 'Smith'.
        //var p1 = rawDb.addTableColumn('Product', 'video', '');
        //
        // Delete column metadata from Photo.
        //var p1 = rawDb.dropTableColumn('Product', 'video');
        //
        //// Rename Photo.isLocal to Photo.local.
        //var p3 = rawDb.renameTableColumn('Photo', 'isLocal', 'local');
        //
        //// Transformations are not supported because of IndexedDB auto-commit: Firefox
        //// immediately commits the transaction when Lovefield tries to return a
        //// promise from scanning existing object stores. Users are supposed to do a
        //// dump and make the transformation outside of onUpgrade routine.
        //
        //// DUMP the whole DB into a JS object.
        //var p4 = rawDb.dump();

        return Promise.all(promises);
    }

}

export default new DatabaseService();

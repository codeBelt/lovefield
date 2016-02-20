import EventDispatcher from 'structurejs/event/EventDispatcher';
import BrowserUtil from 'structurejs/util/BrowserUtil';

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
        //https://github.com/google/lovefield/blob/master/docs/spec/03_life_of_db.md

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

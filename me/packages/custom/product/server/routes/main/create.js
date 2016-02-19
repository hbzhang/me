/**
 * Created by hbzhang on 3/12/15.
 */
'use strict';

var items = require('../../controllers/main/create');

// The Package is past automatically as first parameter
module.exports = function(Item, app, auth, database) {

    app.route('/item/:itemID')
        .get(auth.requiresLogin, items.view)
        .delete(auth.requiresLogin, items.destroy)
        .put(auth.requiresLogin, items.update);

    app.route('/item')
        .get(auth.requiresLogin, items.all)
        .post(auth.requiresLogin, items.create);

    app.param('itemID', items.item);
};



/**
 * Created by hbzhang on 9/15/15.
 */
'use strict';

var api = require('../../controllers/main/api');

// The Package is past automatically as first parameter
module.exports = function(Item, app, auth, database) {

    app.route('/intramuralsignup_test')
        .get(auth.requiresLogin, api.all_versus);

    app.param('itemID', api.item);
};




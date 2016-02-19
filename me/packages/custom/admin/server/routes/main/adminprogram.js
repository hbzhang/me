/**
 * Created by hbzhang on 2/24/15.
 */
'use strict';

var programs = require('../../controllers/main/adminprogram');

// The Package is past automatically as first parameter
module.exports = function(Form, app, auth, database) {

    app.route('/program/:programID')
        .get(auth.requiresLogin, programs.view)
        .delete(auth.requiresLogin, programs.destroy)
        .put(auth.requiresLogin, programs.update);

    app.route('/program')
        .get(auth.requiresLogin, programs.all)
        .post(auth.requiresLogin, programs.create);

    app.param('programID', programs.program);
};

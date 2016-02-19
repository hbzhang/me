/**
 * Created by hbzhang on 2/18/15.
 */
'use strict';

var forms = require('../../controllers/main/adminform');

// The Package is past automatically as first parameter
module.exports = function(Form, app, auth, database) {

    app.route('/form/:formID')
        .get(auth.requiresLogin, forms.view)
        .delete(auth.requiresLogin, forms.destroy)
        .put(auth.requiresLogin, forms.update);

    app.route('/form')
        .get(auth.requiresLogin, forms.all)
        .post(auth.requiresLogin, forms.create);

    app.param('formID', forms.form);
};

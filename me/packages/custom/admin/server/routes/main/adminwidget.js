/**
 * Created by hbzhang on 8/7/15.
 */
'use strict';

var widgets = require('../../controllers/main/adminwidget');

// The Package is past automatically as first parameter
module.exports = function(Form, app, auth, database) {

    app.route('/widget/:widgetID')
        .get(auth.requiresLogin, widgets.view)
        .delete(auth.requiresLogin, widgets.destroy)
        .put(auth.requiresLogin, widgets.update);

    app.route('/widget')
        .get(auth.requiresLogin, widgets.all)
        .post(auth.requiresLogin, widgets.create);

    app.param('widgetID', widgets.widget);
};

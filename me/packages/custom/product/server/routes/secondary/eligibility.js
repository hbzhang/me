/**
 * Created by hbzhang on 11/21/14.
 */
/**
 * Created by hbzhang on 11/2/14.
 */
'use strict';

var eligibilities = require('../../controllers/secondary/eligibility');

// The Package is past automatically as first parameter
module.exports = function(Event, app, auth, database) {

    app.route('/eligibility/:eligibilityID')
        .get(auth.requiresLogin, eligibilities.view)
        .delete(auth.requiresLogin, eligibilities.destroy)
        .put(auth.requiresLogin, eligibilities.update);

    app.route('/eligibility')
        .get(auth.requiresLogin, eligibilities.all)
        .post(auth.requiresLogin, eligibilities.create);

    app.param('eligibilityID', eligibilities.eligibility);
};

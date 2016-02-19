/**
 * Created by hbzhang on 1/5/15.
 */
'use strict';

var information = require('../../controllers/secondary/information');

// The Package is past automatically as first parameter
module.exports = function(Event, app, auth, database) {

  /*  app.route('/information/:informationID')
        .get(auth.requiresLogin, information.view)
        .delete(auth.requiresLogin, information.destroy)
        .put(auth.requiresLogin, information.update);

   app.param('informationID', information.register);

   */

    app.route('/agreement')
        .get(auth.requiresLogin, information.all)
        .post(auth.requiresLogin, information.createinformation);

    app.route('/rawuserroles')
        .get(auth.requiresLogin, information.all)
        .post(auth.requiresLogin, information.createinformation);

    app.route('/userroles')
        .get(auth.requiresLogin, information.all_roles)
        .post(auth.requiresLogin, information.createinformation);

    app.route('/privileges')
        .get(auth.requiresLogin, information.get_privileges)
        .post(auth.requiresLogin, information.createinformation);

    app.route('/userrolesandemails')
        .get(auth.requiresLogin, information.all_roles_and_emails)
        .post(auth.requiresLogin, information.createinformation);


    app.route('/userroles_special_key')
        .get(auth.requiresLogin, information.all_roles_with_special_key)
        .post(auth.requiresLogin, information.createinformation);

    app.route('/all_roles_for_privileges')
        .get(auth.requiresLogin, information.all_roles_for_privileges)
        .post(auth.requiresLogin, information.createinformation);

};

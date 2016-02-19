/**
 * Created by hbzhang on 11/21/14.
 */

'use strict';

var registeries = require('../../controllers/secondary/register');

//The Package is past automatically as first parameter
module.exports = function(Register, app, auth, database) {

    app.route('/registrationqrcode/:event/:userid')
        .get(registeries.getqrcode);

   /* app.route('/registration/:registerID')
        .get(auth.requiresLogin, registeries.view)
   */

    app.route('/registration/:registerID')
        .get(auth.requiresLogin, registeries.register)
        .put(auth.requiresLogin, registeries.update);


    app.route('/registration/:registeredID')
        .delete(auth.requiresLogin, registeries.destroy);

    app.route('/registration')
        .get(auth.requiresLogin, registeries.all)
        .post(auth.requiresLogin, registeries.create);

    app.param('registerID', registeries.update);
    app.param('userid', registeries.getuser);

    //app.param('id', /^\d+$/);

};

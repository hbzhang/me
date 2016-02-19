/**
 * Created by hbzhang on 9/15/15.
 */
'use strict';

var najax = require('../../controllers/main/najax');

 // The Package is past automatically as first parameter
 module.exports = function(Item, app, auth, database) {

 app.route('/updatintramuraleversus')
 .get(auth.requiresLogin, najax.update_versus);

 //app.route('/intramural_not_checkinedin_signup')
 //        .get(auth.requiresLogin, najax.all_notcheckedin_signup);


 app.param('itemID', najax.item);

 };




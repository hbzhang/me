/**
 * Created by hbzhang on 11/25/14.
 */
'use strict';
var checkedinpeople = require('../../controllers/secondary/checkedinpeople');

// The Package is past automatically as first parameter
module.exports = function(Class, app, auth, database,passport) {
    app.route('/checkedinpeople')
        .post(passport.authenticate('basic', { session: false }), checkedinpeople.create);
    app.route('/checkedinpeople/:checkedinpeopleID')
        .get(auth.requiresLogin, checkedinpeople.find);
    //app.param('checkedinpeopleID', events.event);

};


/**
 * Created by hbzhang on 11/2/14.
 */
'use strict';

var events = require('../../controllers/main/event');

// The Package is past automatically as first parameter
module.exports = function(Event, app, auth, database) {

    app.route('/event/:eventID')
        .get(auth.requiresLogin, events.view)
        .delete(auth.requiresLogin, events.destroy)
        .put(auth.requiresLogin, events.update);

    app.route('/event')
        .get(auth.requiresLogin, events.all)
        .post(auth.requiresLogin, events.create);

    app.route('/eventparticipant/:eventParticipantID')
        .get(auth.requiresLogin, events.viewparticipant)
    //.put(auth.requiresLogin, hasClassUpdatePermission, events.update)
        .delete(auth.requiresLogin, events.destroy);

    app.route('/eventparticipant')
        .get(auth.requiresLogin, events.allparticpants)
        .post(auth.requiresLogin, events.createparticipant);

    app.param('eventId', events.event);
};

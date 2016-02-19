/**
 * Created by hbzhang on 11/2/14.
 */
'use strict';


///////////////////////////////// EVENT //////////////////////////
/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Event = mongoose.model('Event'),
    EventParticipants = mongoose.model('EventParticipants'),
    Upload = mongoose.model('Upload'),
    _ = require('lodash'),
    grid = require('gridfs-stream');


/**
 * Find event by id
 */
exports.event = function(req, res, next, id) {
    //console.log(id);
    Event.load(id, function(err, event) {
        if (err) return next(err);
        if (!event) return next(new Error('Failed to load the event' + id));
        req.event = event;
        next();
    });
};

exports.view = function(req, res) {
    //res.jsonp(req.class_);
};


/**
 * Create an event
 */
exports.create = function(req, res) {

    //console.log(req.body);

    var event = new Event(req.body);

    console.log(event);
    /* var e = dateValidation(class_);
     if (e !== '') {
     console.log(e);
     return res.jsonp(500, {
     error: e
     });
     }
     */

    event.save(function(err) {
        if (err) {
            console.log(err);
            return res.jsonp(500, {error: 'cannot save the event'});
        }
        res.jsonp(event);
    });
};


/**
 * List of Events
 */
exports.all = function(req, res) {

    var populateQuery = [{path:'eventcreator'}];
    Event.find({}, '_id eventbasicinformation eventformbuilder ').populate(populateQuery).exec(function(err, events) {
        if (err) {
            return res.jsonp(500, {
                error: 'Cannot list all the events'
            });
        }
        res.jsonp(events);
    });
};

/**
 * Delete a event
 */
exports.destroy = function(req, res) {
    //var event = req.event;
    //console.log(req.param('eventID'));
    Event.remove({ _id: req.param('eventID') }, function(err) {
        if (err) {
            return res.jsonp(500, {
                error: 'Cannot delete the class'
            });
        }
       res.jsonp({ _id: req.param('eventID') });
    });
};

/**
 * Update a event
 */

exports.update = function(req, res) {
    /*  var event = {};
    event.eventbasicinformation = req.param('eventbasicinformation');
    event.eventformbuilder = req.param('eventformbuilder');
    event.eventcreator = req.param('eventcreator');
    event = _.extend(event, req.body);
    console.log(event);
   */
    Event.findOne({_id: req.param('_id') }, function (err, event){
        event.eventbasicinformation = req.param('eventbasicinformation');
        event.eventformbuilder = req.param('eventformbuilder');
        event.eventcreator = req.param('eventcreator');
        console.log(event);
        event.save();
        res.jsonp(event);
    });

   /* Event.update( {_id: req.param('_id') }, event, function(err) {
        if (err) {
            console.log(err);
            return res.jsonp(500, {
                error: 'Cannot update the class'
            });
        }
    }); */

};


///////////////////////////////// EVENT PARTICIPANTS //////////////////////////
/**
 * Find event participant by id
 */
exports.eventparticipant = function(req, res, next, id) {
    EventParticipants.load(id, function(err, eventparticipant) {
        if (err) return next(err);
        if (!eventparticipant) return next(new Error('Failed to load the event participant' + id));
        req.event = eventparticipant;
        next();
    });
};

/**
 * form an event participant
 */
exports.createparticipant = function(req, res) {

    console.log(req.body);

    var eventparticipant = new EventParticipants(req.body);

    console.log(eventparticipant);

    /* var e = dateValidation(class_);
     if (e !== '') {
     console.log(e);
     return res.jsonp(500, {
     error: e
     });
     }
     */

    eventparticipant.save(function(err) {
        if (err) {
            console.log(err);
            return res.jsonp(500, {error: 'cannot save the event'});
        }
        res.jsonp(eventparticipant);
    });
};

/**
 * List of all event participants
 */
exports.allparticpants = function(req, res) {
    var populateQuery = [{path:'students'},{path:'event'}];
    EventParticipants.find({}, '_id eventinformation event').populate(populateQuery).exec(function(err, eventparticipants) {
        if (err) {
            return res.jsonp(500, {
                error: 'Cannot list all the event participants'
            });
        }
        res.jsonp(eventparticipants);
    });
};

exports.viewparticipant = function(req, res) {
    //res.jsonp(req.class_);
};



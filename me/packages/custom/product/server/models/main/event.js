/**
 * Created by hbzhang on 11/2/14.
 */
'use strict';
/**
 * Event Schema
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var EventSchema = new Schema({
    eventbasicinformation: {},
    eventformbuilder: {},
    eventcreator: {
    type: Schema.ObjectId,
    ref: 'User'
    },
    eventcheckedinpeople: {
        type: Schema.ObjectId,
        ref: 'CheckedinPeople'
    }
});

var populateQuery = [{path:'eventcreator'}];
EventSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate(populateQuery).exec(cb);
};

mongoose.model('Event', EventSchema);

var EventParticipantsSchema = new Schema({
    students: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    qrcode:[],
    eventinformation:{},
    event: {
        type: Schema.ObjectId,
        ref: 'Event'
    }
});

var populateQuery1 = [{path:'students'},{path:'event'}];
EventParticipantsSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate(populateQuery1).exec(cb);
};

mongoose.model('EventParticipants', EventParticipantsSchema);



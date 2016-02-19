/**
 * Created by hbzhang on 10/13/14.
 */

'use strict';

/**
 * Module dependencies.
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Post Schema
 */
var TeamAttendanceSchema = new Schema({
    date: {
        type: Date,
        default: Date.now
    },
    team: {
        type: Schema.ObjectId,
        ref: 'Team'
    }
});

/**
 * Validations
 */
TeamAttendanceSchema.path('team').validate(function(message) {
    return message.length;
}, 'Team cannot be blank');

/**
 * Statics
 */
var populateQuery = [{path:'team', select:'name members'}];

TeamAttendanceSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate(populateQuery).exec(cb);
};
TeamAttendanceSchema.set('versionKey', false);
mongoose.model('Teamattendance', TeamAttendanceSchema);

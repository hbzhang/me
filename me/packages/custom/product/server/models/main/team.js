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
var TeamSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    changed: {
        type: Date,
        default: Date.now
    },
    name: {
        type: String,
        trim: true,
        required: true,
        index: true
    },
    creator: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    members: [{
        type: Schema.ObjectId,
        ref: 'User'
    }],
    photo: {
        type: String
    },
    fans: [{
        type: Schema.ObjectId,
        ref: 'User'
    }]
});

/**
 * Validations
 */
TeamSchema.path('name').validate(function(message) {
    return message.length;
}, 'Team Name cannot be blank');

/**
 * Statics
 */
var populateQuery = [{path:'members', select:'name username picture'}, {path:'creator', select:'name username picture'}, {path:'fans',select:'name username picture'}];

TeamSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate(populateQuery).exec(cb);
};
TeamSchema.set('versionKey', false);
mongoose.model('Team', TeamSchema);

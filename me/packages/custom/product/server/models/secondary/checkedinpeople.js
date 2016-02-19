/**
 * Created by hbzhang on 11/20/14.
 */
'use strict';
/**
 * Event Schema
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CheckedinPeopleSchema = new Schema({
    firstname: {
        type: String,
        trim: true
    },
    lastname: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true
    },
    reasonidforcheckin: {}
});


mongoose.model('CheckedinPeople', CheckedinPeopleSchema);


/**
 * Created by hbzhang on 2/18/15.
 */
'use strict';
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var FormSchema = new Schema({
    formbasicinformation: {},
    formformbuilder: {},
    formcreator: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    formroles: {}
});

var populateQuery = [{path:'formcreator'}];
FormSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate(populateQuery).exec(cb);
};

mongoose.model('Form', FormSchema);
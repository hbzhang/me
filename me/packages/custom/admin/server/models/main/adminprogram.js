/**
 * Created by hbzhang on 2/23/15.
 */
'use strict';
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ProgramSchema = new Schema({
    name: [],
    user: {
    type: Schema.ObjectId,
        ref: 'User'
    }
});

var populateQuery = [{path:'programcreator'}];
ProgramSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate(populateQuery).exec(cb);
};

mongoose.model('Program', ProgramSchema);


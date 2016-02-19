/**
 * Created by hbzhang on 3/12/15.
 */
'use strict';
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ItemSchema = new Schema({
    itembasicinformation: {},
    itemformbuilder: {},
    itemcreator: {
        type: Schema.ObjectId,
        ref: 'User'
    },
   itemprogam: {},
   itemcreatedtime: {
        type: String,
        required: true,
        trim: true
    },
   itemcontrol: {},
   itemothers: []

});

var populateQuery = [{path:'itemcreator'}];
ItemSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate(populateQuery).exec(cb);
};

mongoose.model('Item', ItemSchema);
/**
 * Created by hbzhang on 8/7/15.
 */
'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var WidgetSchema = new Schema({
    widgetbasicinformation: {},
    widgetformbuilder: {},
    widgetcreator: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    widgetroles: {}
});

var populateQuery = [{path:'widgetcreator'}];
WidgetSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate(populateQuery).exec(cb);
};

mongoose.model('Widget', WidgetSchema);
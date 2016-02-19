/**
 * Created by hbzhang on 1/5/15.
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var InformationSchema = new Schema({
    agreement:[],
    roles:[],
    privileges:[],
    date: {
        required: true,
        type: Date
    }
});

var populateQuery = [{path:''}];

InformationSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate(populateQuery).exec(cb);
};

mongoose.model('Information', InformationSchema);

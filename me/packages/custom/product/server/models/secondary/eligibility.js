/**
 * Created by hbzhang on 11/21/14.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var EligibilitySchema = new Schema({
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    roles:{},
    whatcando: {}
});

var populateQuery1 = [{path:'user'}];
EligibilitySchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate(populateQuery1).exec(cb);
};

mongoose.model('Eligibility', EligibilitySchema);


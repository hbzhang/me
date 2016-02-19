/**
 * Created by hbzhang on 11/21/14.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RegisterSchema = new Schema({
    users: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    qrcode:[],
    information:{},
    reasonforregister:{},
    registercreatedtime: {
        type: String,
        required: true,
        trim: true
    }
    /*
    event: {
        type: Schema.ObjectId,
        ref: 'Event'
    },
    class: {
        type: Schema.ObjectId,
        ref: 'Class'
    }*/
});

var populateQuery1 = [{path:'users'}];
RegisterSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate(populateQuery1).exec(cb);
};

mongoose.model('Register', RegisterSchema);


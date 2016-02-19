/**
 * Created by hbzhang on 11/21/14.
 */
var mongoose = require('mongoose'),
    Event = mongoose.model('Event'),
    Eligibility = mongoose.model('Eligibility'),
    Upload = mongoose.model('Upload'),
    _ = require('lodash'),
    grid = require('gridfs-stream');


/**
 * Find eligibility by id
 */
exports.eligibility = function(req, res, next, id) {
    Eligibility.load(id, function(err, eligibility) {
        if (err) return next(err);
        if (!eligibility) return next(new Error('Failed to load the event participant' + id));
        req.event = eligibility;
        next();
    });
};

/**
 * Delete a eligibility
 */
exports.destroy = function(req, res) {

    //var event = req.event;
    //console.log(req.param('eventID'));
    Eligibility.remove({ _id: req.param('eligibilityID') }, function(err) {
        if (err) {
            return res.jsonp(500, {
                error: 'Cannot delete the eligibility'
            });
        }
        res.jsonp({ _id: req.param('eligibilityID') });
    });
};


/**
 * Update a eligibility
 */
exports.update = function(req, res) {
    var eligibility = req.eligibility;
    eligibility = _.extend(eligibility, req.body);

    eligibility.save(function(err) {
        if (err) {
            console.log(err);
            return res.jsonp(500, {
                error: 'Cannot update the eligibility'
            });
        }
        res.jsonp(eligibility);
    });
};



/**
 * form an eligibility
 */
exports.create= function(req, res) {

    console.log(req.body);

    var eligibility = new Eligibility(req.body);

    console.log(eligibility);

    /* var e = dateValidation(class_);
     if (e !== '') {
     console.log(e);
     return res.jsonp(500, {
     error: e
     });
     }
     */

    eligibility.save(function(err) {
        if (err) {
            console.log(err);
            return res.jsonp(500, {error: 'cannot save the eligibility'});
        }
        res.jsonp(eligibility);
    });
};

/**
 * List of all eligibilities
 */
exports.all = function(req, res) {
    var populateQuery = [{path:'students'},{path:'event'}];
    Eligibility.find({}, '_id eventinformation event').populate(populateQuery).exec(function(err, eligibilities) {
        if (err) {
            return res.jsonp(500, {
                error: 'Cannot list all the eligibilities'
            });
        }
        res.jsonp(eligibilities);
    });
};

exports.view = function(req, res) {
    //res.jsonp(req.class_);
};



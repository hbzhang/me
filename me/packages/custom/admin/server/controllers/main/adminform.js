/**
 * Created by hbzhang on 2/18/15.
 */

'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Form = mongoose.model('Form'),
    Upload = mongoose.model('Upload'),
    _ = require('lodash'),
    grid = require('gridfs-stream');

/**
 * Find form by id
 */
exports.form = function(req, res, next, id) {
    //console.log(id);
    Form.load(id, function(err, form) {
        if (err) return next(err);
        if (!form) return next(new Error('Failed to load the form' + id));
        req.form = form;
        next();
    });
};

exports.view = function(req, res) {
    //res.jsonp(req.class_);

    Form.findOne({_id: req.param('formID') }, function (err, form){
        res.jsonp(form);
        console.log(form);
    });
};

/**
 * Create a form
 */
exports.create = function(req, res) {

    //console.log(req.body);
    var form = new Form(req.body);
    //console.log(form);
    /* var e = dateValidation(class_);
     if (e !== '') {
     console.log(e);
     return res.jsonp(500, {
     error: e
     });
     }
     */
    form.save(function(err) {
        if (err) {
            console.log(err);
            return res.jsonp(500, {error: 'cannot save the form'});
        }
        res.jsonp(form);
    });
};


/**
 * List all forms
 */
exports.all = function(req, res) {

    var populateQuery = [{path:'formcreator'}];
    Form.find({}, '_id formbasicinformation formformbuilder formroles').populate(populateQuery).exec(function(err, events) {
        if (err) {
            return res.jsonp(500, {
                error: 'Cannot list all the forms'
            });
        }
        res.jsonp(events);
    });
};

/**
 * Delete a form
 */
exports.destroy = function(req, res) {
    //var event = req.event;
    //console.log(req.param('eventID'));
    Form.remove({ _id: req.param('formID') }, function(err) {
        if (err) {
            return res.jsonp(500, {
                error: 'Cannot delete the form'
            });
        }
        res.jsonp({ _id: req.param('formID') });
    });
};

/**
 * Update a form
 */

exports.update = function(req, res) {
    Form.findOne({_id: req.param('formID') }, function (err, form){
        form.formbasicinformation = req.param('formbasicinformation');
        form.formformbuilder = req.param('formformbuilder');
        form.formcreator = req.param('formcreator');
        form.formroles = req.param('formroles');
        form.save();
        res.jsonp(form);
    });
};


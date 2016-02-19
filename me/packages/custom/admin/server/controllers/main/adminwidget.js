/**
 * Created by hbzhang on 8/7/15.
 */

'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Widget = mongoose.model('Widget'),
    Upload = mongoose.model('Upload'),
    _ = require('lodash'),
    grid = require('gridfs-stream');

/**
 * Find widget by id
 */
exports.widget = function(req, res, next, id) {
    //console.log(id);
    Widget.load(id, function(err, widget) {
        if (err) return next(err);
        if (!widget) return next(new Error('Failed to load the widget' + id));
        req.widget = widget;
        next();
    });
};

exports.view = function(req, res) {
    //res.jsonp(req.class_);

    Widget.findOne({_id: req.param('widgetID') }, function (err, widget){
        res.jsonp(widget);
        console.log(widget);
    });
};

/**
 * Create a widget
 */
exports.create = function(req, res) {

    //console.log(req.body);
    var widget = new Widget(req.body);
    //console.log(form);
    /* var e = dateValidation(class_);
     if (e !== '') {
     console.log(e);
     return res.jsonp(500, {
     error: e
     });
     }
     */
    widget.save(function(err) {
        if (err) {
            console.log(err);
            return res.jsonp(500, {error: 'cannot save the widget'});
        }
        res.jsonp(widget);
    });
};


/**
 * List all widgets
 */
exports.all = function(req, res) {

    var populateQuery = [{path:'widgetcreator'}];
    Widget.find({}, '_id widgetbasicinformation widgetformbuilder widgetroles').populate(populateQuery).exec(function(err, widgets) {
        if (err) {
            return res.jsonp(500, {
                error: 'Cannot list all the widgets'
            });
        }
        res.jsonp(widgets);
    });
};

/**
 * Delete a widget
 */
exports.destroy = function(req, res) {
    //var event = req.event;
    //console.log(req.param('eventID'));
    Widget.remove({ _id: req.param('widgetID') }, function(err) {
        if (err) {
            return res.jsonp(500, {
                error: 'Cannot delete the widget'
            });
        }
        res.jsonp({ _id: req.param('widgetID') });
    });
};

/**
 * Update a widget
 */

exports.update = function(req, res) {
    Widget.findOne({_id: req.param('widgetID') }, function (err, widget){
        widget.widgetbasicinformation = req.param('widgetbasicinformation');
        widget.widgetformbuilder = req.param('widgetformbuilder');
        widget.widgetcreator = req.param('widgetcreator');
        widget.widgetroles = req.param('widgetroles');
        widget.save();
        res.jsonp(widget);
    });
};


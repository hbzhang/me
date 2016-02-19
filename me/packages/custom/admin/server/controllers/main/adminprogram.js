/**
 * Created by hbzhang on 2/24/15.
 */

'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Program = mongoose.model('Program'),
    Upload = mongoose.model('Upload'),
    _ = require('lodash'),
    grid = require('gridfs-stream');

/**
 * Find program by id
 */
exports.program = function(req, res, next, id) {
    //console.log(id);
    Program.load(id, function(err, program) {
        if (err) return next(err);
        if (!program) return next(new Error('Failed to load the program' + id));
        req.program = program;
        next();
    });
};

exports.view = function(req, res) {
    //res.jsonp(req.class_);
};

/**
 * Create a program
 */
exports.create = function(req, res) {

    console.log(req.body);

    Program.remove().exec();

    var program = new Program(req.body);

    console.log(program);

    /* var e = dateValidation(class_);
     if (e !== '') {
     console.log(e);
     return res.jsonp(500, {
     error: e
     });
     }
     */

    program.save(function(err) {
        if (err) {
            console.log(err);
            return res.jsonp(500, {error: 'cannot save the event'});
        }
        res.jsonp(program);
    });
};


/**
 * List all programs
 */
exports.all = function(req, res) {
    var populateQuery = [{path:'user'}];
    Program.find({}, '_id name').populate(populateQuery).exec(function(err, events) {
        if (err) {
            return res.jsonp(500, {
                error: 'Cannot list all the programs'
            });
        }
        res.jsonp(events);
    });
};

/**
 * Delete a program
 */
exports.destroy = function(req, res) {
    //var event = req.event;
    //console.log(req.param('eventID'));
    Program.remove({ _id: req.param('programID') }, function(err) {
        if (err) {
            return res.jsonp(500, {
                error: 'Cannot delete the program'
            });
        }
        res.jsonp({ _id: req.param('programID') });
    });
};

/**
 * Update a program
 */
exports.update = function(req, res) {
    Program.findOne({_id: req.param('_id') }, function (err, program){
        program.name = req.param('name');
        program.user = req.param('user');
        console.log(program);
        program.save();
        res.jsonp(program);
    });

};
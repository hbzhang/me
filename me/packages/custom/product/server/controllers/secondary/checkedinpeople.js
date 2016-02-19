/**
 * Created by hbzhang on 11/21/14.
 */
'use strict';
var mongoose = require('mongoose'),
    CheckedinPeople = mongoose.model('CheckedinPeople'),
    Event = mongoose.model('Event'),
    Class = mongoose.model('Class');


var populateQuery = [{path:'student', select:'name username email'}, {path:'class', select:'title'}];


exports.create = function(req, res) {
    var checkedinpeople = new CheckedinPeople(req.body);
    //var date = new Date();
    //date.setTime(attendance.date.getTime());
    //date.setHours(0, 0, 0, 0);
    Class.find({_id: checkedinpeople.reasonidforcheckin}).exec(function(err, classes) {
            //CheckedinPeople.findOne({student: checkedinpeople.student, class_: checkedinpeople.class_, date: {$gte: date, $lt: date}});
        if (classes.length >0) {
            checkedinpeople.save(function (err) {
                if (err) {
                    return res.jsonp(500, {error: 'cannot submit the attendance'});
                }
                res.jsonp(checkedinpeople);
            });
        }

    });
   Event.find({_id: checkedinpeople.reasonidforcheckin}).exec(function(err, events) {
            //CheckedinPeople.findOne({student: attendance.student, class_: attendance.class_, date: {$gte: date, $lt: date}});
       if (events.length >0) {
           checkedinpeople.save(function (err) {
               if (err) {
                   return res.jsonp(500, {error: 'cannot submit the attendance'});
               }
               res.jsonp(checkedinpeople);
           });
       }
    });
};


exports.find = function(req, res) {
    var id = req.params.reasonidforcheckin;
    var query = {};

    Class.findOne({_id: id}).exec(function (err, class_) {

        if (class_.length >0) {
            CheckedinPeople.find({reasonidforcheckin: id}).populate(populateQuery).exec(function (err, checkinedpeople) {
                if (err) {
                    return res.jsonp(500, {
                        error: 'Cannot list the checkedin people'
                    });
                }
                res.jsonp(checkinedpeople);
            });
        }
    });

   Event.findOne({_id: id}).exec(function (err, event) {

        if (event.length >0) {
            CheckedinPeople.find({reasonidforcheckin: id}).populate(populateQuery).exec(function (err, checkinedpeople) {
                if (err) {
                    return res.jsonp(500, {
                        error: 'Cannot list the checkedin people'
                    });
                }
                res.jsonp(checkinedpeople);
            });
        }
    });

};

exports.destroy = function(id, cb) {
    CheckedinPeople.remove({reasonidforcheckin: id}, cb);
};

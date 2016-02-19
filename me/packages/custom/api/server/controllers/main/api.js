/**
 * Created by hbzhang on 9/15/15.
 */


'use strict';

/*
var knexConfig_signup = require('../secondary/knexfile-signup');
var knex_signup = require('knex')(knexConfig_signup.development);
var bookshelf_signup = require('bookshelf')(knex_signup);


var knexConfig_versus = require('../secondary/knexfile-versus');
var knex_versus = require('knex')(knexConfig_versus.development);
var bookshelf_versus = require('bookshelf')(knex_versus);

exports.all_versus = function(req, res) {

    var User = bookshelf_versus.Model.extend({
        tableName: 'users'
    });

    User.collection()
        .fetch()
        .then(function (collection) {
            res.json({error: false, data: collection.toJSON()});
        })
        .otherwise(function (err) {
            res.status(500).json({error: true, data: {message: err.message}});
        });


};

exports.all_signup = function(req, res) {

    var Thing = bookshelf_signup.Model.extend({
        tableName: 'things'
    });


    var User = bookshelf_signup.Model.extend({
        tableName: 'users',
        things: function() {
            return this.hasMany(Thing);
        }
    });

    User.collection()
        .fetch()
        .then(function (collection) {
            res.json({error: false, data: collection.toJSON()});
        })
        .otherwise(function (err) {
            res.status(500).json({error: true, data: {message: err.message}});
        });


   Thing.collection()
        .fetch()
        .then(function (collection) {
            res.json({error: false, data: collection.toJSON()});
        })
        .otherwise(function (err) {
            res.status(500).json({error: true, data: {message: err.message}});
        });

};

exports.item = function(req, res, next, id) {

};
*/

exports.all_versus = function(req, res) {

};

exports.item = function(req, res, next, id) {

};

/*
var api = require('kalamata')(app);

var Thing = bookshelf.Model.extend({
    tableName: 'things'
});

var User = bookshelf.Model.extend({
    tableName: 'users',
    things: function() {
        return this.hasMany(Thing);
    }
});

api.expose(User);
api.expose(Thing);


function execThingsQuery(req, res, model) {
    // only get things that are not flagged as deleted
    model.where({'deleted': false});
}


api.beforeGetThings(execThingsQuery);
api.beforeGetRelatedThings(execThingsQuery);

 */

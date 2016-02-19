/**
 * Created by hbzhang on 1/5/15.
 */
var mongoose = require('mongoose'),
    Information = mongoose.model('Information'),
    Upload = mongoose.model('Upload'),
    User = mongoose.model('User'),
    _ = require('lodash');


/**
 * create an information
 */
exports.createinformation= function(req, res) {

    console.log(req.body);

    var information = new Information(req.body);

    console.log(information);

    /* var e = dateValidation(class_);
     if (e !== '') {
     console.log(e);
     return res.jsonp(500, {
     error: e
     });
     }
     */

    information.save(function(err) {
        if (err) {
            console.log(err);
            return res.jsonp(500, {error: 'cannot save the information'});
        }
        res.jsonp(information);
    });
};


/**
 * List of all information
 */
exports.all = function(req, res) {
    var populateQuery = [{path:''}];
    Information.find({}, '_id agreement roles privileges').populate(populateQuery).exec(function(err, information) {
        if (err) {
            return res.jsonp(500, {
                error: 'Cannot list all the information'
            });
        }
        res.jsonp(information);
    });
};


/**
 * List privileges
 */
exports.get_privileges = function(req, res) {
    var populateQuery = [{path:''}];
    Information.find({}, '_id privileges').sort({ date : -1}).populate(populateQuery).exec(function(err, information) {
        if (err) {
            return res.jsonp(500, {
                error: 'Cannot list all the privileges'
            });
        }

        var privileges = [];
        if (information) {
            _.each(information, function (value) {
                if (value.privileges.length > 0) {
                  privileges.push(value);
                }

            });
        }

        res.jsonp(privileges);
    });
};


/**
 * List roles
 */
exports.all_roles = function(req, res) {
    var populateQuery = [{path:''}];
    Information.find({}, '_id roles').populate(populateQuery).exec(function(err, information) {
        if (err) {
            return res.jsonp(500, {
                error: 'Cannot list all the information'
            });
        }

        var roles = [];
        if (information) {
            _.each(information, function (value) {
                if (value.roles.length > 0) {
                    //roles = [];
                    //console.log(value.roles);
                    var index = 0;
                    value.roles = _.uniq(value.roles);

                    _.each(value.roles, function (item) {

                        var found = false;
                        _.each(roles, function (itemr) {
                            if(itemr ===item)
                                found = true;
                        });

                        if(!found) {
                            roles.push(item);
                        }

                    });
                }
            });

        }

        res.jsonp(roles);
    });
};


/**
 * List roles and emails
 */
exports.all_roles_and_emails = function(req, res) {
    var populateQuery = [{path:''}];
    Information.find({}, '_id roles').populate(populateQuery).exec(function(err, information) {
        if (err) {
            return res.jsonp(500, {
                error: 'Cannot list all the roles'
            });
        }
        var roles_and_emails = [];
        if (information) {
            _.each(information, function (value) {
                if (value.roles.length > 0) {
                    //roles_and_emails = [];
                    //console.log(value.roles);
                    value.roles = _.uniq(value.roles);
                    _.each(value.roles, function (item) {
                        var found = false;
                        _.each(roles_and_emails, function (itemr) {
                            if(itemr === item)
                                found = true;
                        });

                        if(!found) {
                            roles_and_emails.push(item);
                        }

                    });
                }

            });

            roles_and_emails = _.uniq(roles_and_emails);

            //console.log(roles_and_emails);

            User.find().sort('-created').populate('user', 'name username email').exec(function(err, users) {

                if (err) {
                    res.render('error', {
                        status: 500
                    });
                } else {
                    if (users) {
                        _.each(users, function (value) {
                            roles_and_emails.push(value.email);
                        });
                    }

                    roles_and_emails = _.uniq(roles_and_emails);
                    //console.log(roles_and_emails);
                    res.jsonp(roles_and_emails);
                }
            });
        }


    });
};


/**
 * List roles with special key (for admin users tags input)
 */
exports.all_roles_with_special_key = function(req, res) {
    var populateQuery = [{path:''}];
    Information.find({}, '_id roles').populate(populateQuery).exec(function(err, information) {
        if (err) {
            return res.jsonp(500, {
                error: 'Cannot list all the information'
            });
        }

        var roles = [];
        if (information) {
            var index = 0;
            _.each(information, function (value) {
                if (value.roles.length > 0) {
                    //roles = [];
                    value.roles = _.uniq(value.roles);
                    _.each(value.roles, function (item) {

                        var found = false;
                        _.each(roles, function (itemr) {
                            if(itemr.text ===item)
                                found = true;
                        });

                        if(!found) {
                            var el = {
                                'text': item
                            };
                            roles.push(el);
                        }

                    });

                }

            });
        }

        roles = _.uniq(roles);
       // console.log(roles);
        res.jsonp(roles);
    });
};


/**
 * List roles for privilege setting
 */
exports.all_roles_for_privileges = function(req, res) {
    var populateQuery = [{path:''}];
    Information.find({}, '_id roles').populate(populateQuery).exec(function(err, information) {
        if (err) {
            return res.jsonp(500, {
                error: 'Cannot list all the roles'
            });
        }

        var roles = [];
        var index = 0;
        if (information) {
            _.each(information, function (value) {
                if (value.roles.length > 0) {
                    value.roles = _.uniq(value.roles);
                    _.each(value.roles, function (item) {
                        var found = false;
                        _.each(roles, function (itemr) {
                            if(itemr.name ===item)
                            found = true;
                        });

                        if(!found) {
                            var el = {'icon': '', 'name': item, 'maker': '', 'ticked': false}
                            roles.push(el);
                            index = index + 1;
                        }

                    });

                }

            });
        }

        roles = _.uniq(roles);
        res.jsonp(roles);
    });
};




'use strict';

/**
 * Generic require login routing middleware
 */
exports.requiresLogin = function(req, res, next) {
  //console.log(req);
  if (!req.isAuthenticated()) {
    return res.send(401, 'User is not authorized');
  }
  next();
};

/**
 * Basic Auth require login routing middleware
 */
/*
exports.requiresBasicLogin = function(req, res, next) {
  //console.log(req);
  if (!passport.authenticate('basic', { session: false })) {
    return res.send(401, 'User basic auth is not authorized');
  }
  next();
};
*/

/**
 * Generic require Admin routing middleware
 * Basic Role checking - future release with full permission system
 */
exports.requiresAdmin = function(req, res, next) {
  if (!req.isAuthenticated() || !req.user.hasRole('admin')) {
    return res.send(401, 'User is not authorized');
  }
  next();
};

'use strict';

// The Package is past automatically as first parameter
module.exports = function(Front, app, auth, database) {

  app.get('/front/example/anyone', function(req, res, next) {
    res.send('Anyone can access this');
  });

  app.get('/front/example/auth', auth.requiresLogin, function(req, res, next) {
    res.send('Only authenticated users can access this');
  });

  app.get('/front/example/admin', auth.requiresAdmin, function(req, res, next) {
    res.send('Only users with Admin role can access this');
  });

  app.get('/front/example/render', function(req, res, next) {
    Front.render('index', {
      package: 'front'
    }, function(err, html) {
      //Rendering a view from the Package server/views
      res.send(html);
    });
  });
};

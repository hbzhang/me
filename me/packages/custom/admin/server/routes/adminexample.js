'use strict';

// The Package is past automatically as first parameter
module.exports = function(Admin, app, auth, database) {

  app.get('/admin/example/anyone', function(req, res, next) {
    res.send('Anyone can access this');
  });

  app.get('/admin/example/auth', auth.requiresLogin, function(req, res, next) {
    res.send('Only authenticated users can access this');
  });

  app.get('/admin/example/admin', auth.requiresAdmin, function(req, res, next) {
    res.send('Only users with Admin role can access this');
  });

  app.get('/admin/example/render', function(req, res, next) {
    Admin.render('index', {
      package: 'admin'
    }, function(err, html) {
      //Rendering a view from the Package server/views
      res.send(html);
    });
  });
};

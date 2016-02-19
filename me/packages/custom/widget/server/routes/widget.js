'use strict';

// The Package is past automatically as first parameter
module.exports = function(Widget, app, auth, database) {

  app.get('/widget/example/anyone', function(req, res, next) {
    res.send('Anyone can access this');
  });

  app.get('/widget/example/auth', auth.requiresLogin, function(req, res, next) {
    res.send('Only authenticated users can access this');
  });

  app.get('/widget/example/admin', auth.requiresAdmin, function(req, res, next) {
    res.send('Only users with Admin role can access this');
  });

  app.get('/widget/example/render', function(req, res, next) {
    Widget.render('index', {
      package: 'widget'
    }, function(err, html) {
      //Rendering a view from the Package server/views
      res.send(html);
    });
  });
};

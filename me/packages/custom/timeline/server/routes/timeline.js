'use strict';

// The Package is past automatically as first parameter
module.exports = function(Timeline, app, auth, database) {

  app.get('/timeline/example/anyone', function(req, res, next) {
    res.send('Anyone can access this');
  });

  app.get('/timeline/example/auth', auth.requiresLogin, function(req, res, next) {
    res.send('Only authenticated users can access this');
  });

  app.get('/timeline/example/admin', auth.requiresAdmin, function(req, res, next) {
    res.send('Only users with Admin role can access this');
  });

  app.get('/timeline/example/render', function(req, res, next) {
    Timeline.render('index', {
      package: 'timeline'
    }, function(err, html) {
      //Rendering a view from the Package server/views
      res.send(html);
    });
  });
};

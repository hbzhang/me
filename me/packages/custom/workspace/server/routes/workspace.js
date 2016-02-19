'use strict';

// The Package is past automatically as first parameter
module.exports = function(Workspace, app, auth, database) {

  app.get('/workspace/example/anyone', function(req, res, next) {
    res.send('Anyone can access this');
  });

  app.get('/workspace/example/auth', auth.requiresLogin, function(req, res, next) {
    res.send('Only authenticated users can access this');
  });

  app.get('/workspace/example/admin', auth.requiresAdmin, function(req, res, next) {
    res.send('Only users with Admin role can access this');
  });

  app.get('/workspace/example/render', function(req, res, next) {
    Workspace.render('index', {
      package: 'workspace'
    }, function(err, html) {
      //Rendering a view from the Package server/views
      res.send(html);
    });
  });
};

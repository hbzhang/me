'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Workspace = new Module('workspace');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Workspace.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Workspace.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  /*Workspace.menus.add({
    title: 'workspace example page',
    link: 'workspace example page',
    roles: ['authenticated'],
    menu: 'main'
  });*/
  
  Workspace.aggregateAsset('css', 'workspace.css');

  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Workspace.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Workspace.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Workspace.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  return Workspace;
});

'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Helpers = new Module('helpers');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Helpers.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Helpers.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
 /* Helpers.menus.add({
    title: 'helpers example page',
    link: 'helpers example page',
    roles: ['authenticated'],
    menu: 'main'
  });*/

  
  Helpers.aggregateAsset('css', 'helpers.css');

  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Helpers.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Helpers.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Helpers.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  return Helpers;
});

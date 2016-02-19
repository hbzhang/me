'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Timeline = new Module('timeline');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Timeline.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Timeline.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
 /* Timeline.menus.add({
    title: 'timeline example page',
    link: 'timeline example page',
    roles: ['authenticated'],
    menu: 'main'
  });
 */

  Timeline.aggregateAsset('css', 'timeline.css');

  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Timeline.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Timeline.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Timeline.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  return Timeline;
});

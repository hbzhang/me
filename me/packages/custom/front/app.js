'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Front = new Module('front');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Front.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Front.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  /*Front.menus.add({
    title: 'front example page',
    link: 'front example page',
    roles: ['authenticated'],
    menu: 'main'
  });*/
  
  Front.aggregateAsset('css', 'front.css');
  Front.aggregateAsset('css', 'deckgrid.css');


  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Front.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Front.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Front.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  return Front;
});

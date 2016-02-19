'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Page = new Module('page');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Page.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Page.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  /*Page.menus.add({
    title: 'page example page',
    link: 'page example page',
    roles: ['authenticated'],
    menu: 'main'
  });*/
  
  Page.aggregateAsset('css', 'page.css');

  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Page.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Page.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Page.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  return Page;
});

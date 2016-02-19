'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Widget = new Module('widget');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Widget.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Widget.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
 /* Widget.menus.add({
    title: 'widget example page',
    link: 'widget example page',
    roles: ['authenticated'],
    menu: 'main'
  }); */
  
  Widget.aggregateAsset('css', 'widget.css');

  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Widget.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Widget.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Widget.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  return Widget;
});

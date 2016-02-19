'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Product = new Module('product');


/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Product.register(function(app, auth, passport, database) {

    //We enable routing. By default the Package Object is passed to the routes
    Product.routes(app, auth, database,passport);

    Product.menus.add({
        title: 'Home',
        link: 'home',
        roles: ['authenticated'],
        menu: 'main'
    });

    /*
    Product.menus.add({
        title: 'Announcements',
        link: 'announcements',
        roles: ['authenticated'],
        menu: 'main'
    });

    Product.menus.add({
        title: 'Classes',
        link: 'class',
        roles: ['authenticated', 'student', 'admin', 'instructor'],
        menu: 'main'
    });

    Product.menus.add({
        title: 'My classes',
        link: 'my class',
        roles: ['admin', 'student', 'instructor'],
        menu: 'main'
    });

    //We are adding a link to the main menu for all authenticated users
    Product.menus.add({
        title: 'Create class',
        link: 'form class',
        roles: ['admin'],
        menu: 'main'
    });
   */

    ///// ALL JS AND CSS DEPENDENCIES //////////////////////////

   //general
    Product.aggregateAsset('css', 'class.css');
    Product.aggregateAsset('css', 'product.css');
    Product.aggregateAsset('css', 'components.css');
    Product.aggregateAsset('css', 'tile.css');

    //tree
    //Product.aggregateAsset('css', '../lib/abn-tree/abn_tree.css');

    //clip board
    /*Product.aggregateAsset('js', '../lib/zeroclipboard/dist/ZeroClipboard.min.js', {
        absolute: false,
        global: true
    }); */
    Product.aggregateAsset('js', '../lib/ng-clip/src/ngClip.js', {
        absolute: false,
        global: true
    });

    //slide menu and its content
    /* Product.aggregateAsset('js', '../js/adminuser.js', {
        absolute: false
    });*/
    Product.aggregateAsset('css', 'slidepanel.css');
    Product.aggregateAsset('css', '../lib/ng-pageslide/dist/angular-pageslide-directive.css');
    Product.aggregateAsset('js', '../lib/ng-pageslide/dist/angular-pageslide-directive.js', {
        absolute: false
    });

    //popup dialog
   /* Product.aggregateAsset('js', '../lib/angularjs-modal-service/src/createDialog.js', {
        absolute: false
    });*/

    Product.aggregateAsset('js', '../lib/angularjs-toaster/toaster.js', {
        absolute: false
    });

    //progress bar
    Product.aggregateAsset('css', '../lib/angularjs-toaster/toaster.css');

    //animation
    Product.aggregateAsset('js', '../js/animation.js', {
        absolute: false
    });

    //form builder
   /* Product.aggregateAsset('js', '../js/event.js', {
        absolute: false
    }); */
    Product.aggregateAsset('js', '../js/wizard.js', {
        absolute: false
    });

    //slide-in-menu
    // Product.aggregateAsset('css', '../lib/ng-mobile-menu/demo.css');
    //Product.aggregateAsset('js', '../lib/ng-mobile-menu/demo.js');

    Product.angularDependencies(['ui.router','focusOn','ui.calendar','gridster', 'pageslide-directive', 'fundoo.services','ngClipboard','angularFileUpload']);

    //file-upload
    //Product.aggregateAsset('js', '../lib/ng-file-upload/angular-file-upload-html5-shim.js');
    //Product.aggregateAsset('js', '../lib/ng-file-upload/angular-file-upload.min.js');

    //Product.aggregateAsset('js', '../lib/angular-file-upload/angular-file-upload.js');


    /*  Product.aggregateAsset('js', '../lib/es5-shim/es5-shim.min.js');
        Product.aggregateAsset('js', '../lib/angular-file-upload/angular-file-upload.min.js');
    */


    return Product;
});

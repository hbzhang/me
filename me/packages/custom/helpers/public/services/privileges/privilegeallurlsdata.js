/**
 * Created by hbzhang on 5/27/15.
 */
'use strict';

angular.module('mean.helpers').factory('PrivilegeAllURLsData',['$resource','$rootScope','Global',
    function($resource,$rootScope,Global) {

    var allAdminMenus = [
        {url: 'admin-factory', name: 'Factory', label: 'Factory', package:'admin'},
        {url: 'managementusers', name: 'User', label: 'User', package:'admin'},
        {url: 'privilege', name: 'Privilege', label: 'Privilege', package:'admin'}
    ];

    var allFactoryMenus = [
        {url: 'createprogram', name: 'Program', label: 'Program', package:'admin'},
        {url: 'createform', name: 'Form', label: 'Form', package:'admin'},
        {url: 'createwidget', name: 'Widget', label: 'Widget', package:'admin'},
        {url: 'legalagreement', name: 'Legal Agreement', label: 'Agreement', package:'admin'}
    ];

    var allBuilderMenus = [
        {url: 'builder', name: 'Items', label: 'Items', package:'product'},
        {url: 'auxiliaryproduct', name: 'Auxiliary', label: 'Auxiliary', package:'product'}
    ];

    var workspacemenu = [
        {url: 'workspace', name: 'Items', label: 'Items', package:'workspace'},
        {url: 'auxiliaryworkspace', name: 'Auxiliary', label: 'Auxiliary', package:'workspace'}
    ];


    var icons = 'product/assets/img/icons/';

    var rightAdminMenu = [{
        'label': 'Workspace',
        'package': 'workspace',
        'title': 'workspace',
        'link': 'workspace',
        'icon': icons + 'product.png'
    },
    {
        'label': 'Builder',
        'package': 'product',
        'title': 'builder',
        'link': 'builder',
        'icon': icons + 'calender.png'
     },
        /* {  // removed the dashboard from the repo and make it an independent module
         'roles': 'authenticated',
         'title': 'dashboard',
         'link': 'dashboard',
         'icon': icons + 'management.png'
         },*/
      {
         'label': 'Admin',
         'package': 'admin',
         'title': 'admin',
         'link': 'admin-factory',
         'icon': icons + 'add.png'
      }];

    var rightadminmenu_in_general = {
        'label':'Right Admin Menu',
        'role': Global.user.roles,
        'package':'PACKAGE-COLLECTION'
    };

    return {
        allAdminMenus: allAdminMenus,
        allFactoryMenus:allFactoryMenus,
        allBuilderMenus:allBuilderMenus,
        rightAdminMenu:rightAdminMenu,
        workspacemenu:workspacemenu,
        rightadminmenu_in_general:rightadminmenu_in_general
    };

}]);
/**
 * Created by hbzhang on 2/18/15.
 */
'use strict';

angular.module('mean.admin').config(['$stateProvider', '$urlRouterProvider', '$locationProvider','$provide',
    function($stateProvider, $urlRouterProvider, $locationProvider,$provide) {
        $stateProvider
            .state('createform', {
                url: '/createform',
                views:{
                    '':{
                        templateUrl: 'admin/views/menu/management.html'
                        //controller: 'SlidePanelContentController'
                    },
                    'lefttree@createform':{
                        templateUrl: 'admin/views/menu/management-tree.html',
                        controller: 'AdminSlidePanelContentController'
                    },
                    'righttabs@createform':{

                        templateUrl: 'admin/views/form/createform.html'
                    }

                }

            })
           .state('listform', {
                url: '/listform',
                views:{
                    '':{
                        templateUrl: 'product/views/slidepanels/management.html'
                        //controller: 'SlidePanelContentController'
                    },
                    'lefttree@listform':{
                        templateUrl: 'admin/views/menu/management-tree.html',
                        controller: 'AdminSlidePanelContentController'
                    },
                    'righttabs@listform':{

                        templateUrl: 'admin/views/form/listform.html'
                    }

                }

            })
            .state('formedit', {
                url: '/form/edit/:formID',
                views:{
                    '':{
                        templateUrl: 'product/views/slidepanels/management.html'
                        //controller: 'SlidePanelContentController'
                    },
                    'lefttree@formedit':{
                        templateUrl: 'admin/views/menu/management-tree.html',
                        controller: 'AdminSlidePanelContentController'
                    },
                    'righttabs@formedit':{

                        templateUrl: 'admin/views/form/editform.html',
                        controller: 'EditFormController'
                    }

                }

            });


    }
]);

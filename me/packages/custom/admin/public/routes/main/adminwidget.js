/**
 * Created by hbzhang on 8/3/15.
 */
/**
 * Created by hbzhang on 2/18/15.
 */
'use strict';

angular.module('mean.admin').config(['$stateProvider', '$urlRouterProvider', '$locationProvider','$provide',
    function($stateProvider, $urlRouterProvider, $locationProvider,$provide) {
        $stateProvider
            .state('createwidget', {
                url: '/createwidget',
                views:{
                    '':{
                        templateUrl: 'admin/views/menu/management.html'
                        //controller: 'SlidePanelContentController'
                    },
                    'lefttree@createwidget':{
                        templateUrl: 'admin/views/menu/management-tree.html',
                        controller: 'AdminSlidePanelContentController'
                    },
                    'righttabs@createwidget':{

                        templateUrl: 'admin/views/widget/createwidget.html'
                    }

                }

            })
            .state('listwidget', {
                url: '/listwidget',
                views:{
                    '':{
                        templateUrl: 'product/views/slidepanels/management.html'
                        //controller: 'SlidePanelContentController'
                    },
                    'lefttree@listwidget':{
                        templateUrl: 'admin/views/menu/management-tree.html',
                        controller: 'AdminSlidePanelContentController'
                    },
                    'righttabs@listwidget':{

                        templateUrl: 'admin/views/form/listform.html'

                    }

                }

            })
            .state('widgetedit', {
                url: '/widget/edit/:widgetID',
                views:{
                    '':{
                        templateUrl: 'product/views/slidepanels/management.html'
                        //controller: 'SlidePanelContentController'
                    },
                    'lefttree@widgetedit':{
                        templateUrl: 'admin/views/menu/management-tree.html',
                        controller: 'AdminSlidePanelContentController'
                    },
                    'righttabs@widgetedit':{

                        templateUrl: 'admin/views/widget/editwidget.html'
                    }

                }

            });


    }
]);

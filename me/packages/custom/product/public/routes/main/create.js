/**
 * Created by hbzhang on 3/5/15.
 */
'use strict';

angular.module('mean.product').config(['$stateProvider', '$urlRouterProvider', '$locationProvider','$provide',
    function($stateProvider, $urlRouterProvider, $locationProvider,$provide) {
        $stateProvider
            .state('createitem', {
                url: '/createitem/new/:formID',
                views:{
                    '':{
                        templateUrl: 'product/views/slidepanels/management.html'
                        //controller: 'SlidePanelContentController'
                    },
                    'lefttree@createitem':{
                        templateUrl: 'product/views/menu/create/create-tree.html',
                        controller: 'SlidePanelContentController'
                    },
                    'righttabs@createitem':{

                        templateUrl: 'product/views/product/create/createitem.html'
                    }

                }

            })
            .state('listcreateditem', {
                url: '/listcreateditem',
                views:{
                    '':{
                        templateUrl: 'product/views/slidepanels/management.html'
                        //controller: 'SlidePanelContentController'
                    },
                    'lefttree@listcreateditem':{
                        templateUrl: 'product/views/menu/create/create-tree.html',
                        controller: 'SlidePanelContentController'
                    },
                    'righttabs@listcreateditem':{

                        templateUrl: 'product/views/product/create/listcreateditem.html'

                    }

                }

            })
            .state('editcreateditem', {
                url: '/createditem/edit/:itemID',
                views:{
                    '':{
                        templateUrl: 'product/views/slidepanels/management.html'
                        //controller: 'SlidePanelContentController'
                    },
                    'lefttree@editcreateditem':{
                        templateUrl: 'product/views/menu/create/create-tree.html',
                        controller: 'SlidePanelContentController'
                    },
                    'righttabs@editcreateditem':{

                        templateUrl: 'product/views/product/create/editcreateditem.html'
                    }

                }

            });



    }
]);

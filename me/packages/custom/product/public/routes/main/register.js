/**
 * Created by hbzhang on 4/3/15.
 */
'use strict';

angular.module('mean.product').config(['$stateProvider', '$urlRouterProvider', '$locationProvider','$provide',
    function($stateProvider, $urlRouterProvider, $locationProvider,$provide) {
        $stateProvider
            .state('listregisteredforitem', {
                url: '/listregisteredforitem/:itemID',
                views:{
                    '':{
                        templateUrl: 'product/views/slidepanels/management.html'
                        //controller: 'SlidePanelContentController'
                    },
                    'lefttree@listregisteredforitem':{
                        templateUrl: 'product/views/menu/create/create-tree.html',
                        controller: 'SlidePanelContentController'
                    },
                    'righttabs@listregisteredforitem':{

                        templateUrl: 'product/views/register/registerforitem/list.html'
                    }

                }

            })
            .state('itemsubmissiondetails', {
                url: '/itemsubmissiondetails/:itemSubmissionID',
                views:{
                    '':{
                        templateUrl: 'front/views/frame/index/mainmenu.html'
                        //controller: 'SlidePanelContentController'
                    },
                    'lefttree@itemsubmissiondetails':{
                        templateUrl: 'product/views/menu/create/create-tree.html',
                        controller: 'SlidePanelContentController'
                    },
                    'righttabs@itemsubmissiondetails':{

                        templateUrl: 'product/views/register/registerforitem/edit.html'
                    }

                }

            });


    }
]);

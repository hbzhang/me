/**
 * Created by hbzhang on 10/22/14.
 */

'use strict';
// Declare app level module which depends on filters, and services
angular.module('slidepanelcontent', ['ngCookies','ngResource','ngSanitize','ui.router'])

    .run(['$rootScope', '$state', '$stateParams',
        function($rootScope, $state, $stateParams) {
            // It's very handy to add references to $state and $stateParams to the $rootScope
            // so that you can access them from any scope within your applications.For example,
            // <li ui-sref-active='active }'> will set the <li> // to active whenever
            // 'contacts.list' or one of its decendents is active.
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
        }
    ])

    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
        function($stateProvider, $urlRouterProvider, $locationProvider,$provide) {
            // Use $urlRouterProvider to configure any redirects (when) and invalid urls (otherwise).
            // $locationProvider.html5Mode(true);
            $urlRouterProvider.otherwise('/');
            // The `when` method says if the url is ever the 1st param, then redirect to the 2nd param
            // Here we are just setting up some convenience urls.
            // .when('/c?id', '/contacts/:id')
            // .when('/users/:id', '/contacts/:id')
            // $stateProvider
            //     .state('page-1', {
            //         url: '/page-1/:id',
            //         templateUrl: function($stateParams) {
            //             console.log($stateParams);
            //             return 'views/page-1.' + $stateParams.filterBy + '.html';
            //         }
            //     });


            //$locationProvider.html5Mode(true).hashPrefix('!');


           $stateProvider
                .state('event', {
                    url: '/event',
                    views:{
                        '':{
                            templateUrl: 'product/views/slidepanels/product.html',
                            controller: 'SlidePanelContentController'
                        },
                        'lefttree@event':{
                            templateUrl: 'product/views/menu/product/product-tree.html',
                            controller: 'SlidePanelContentController'
                        },
                        'righttabs@event':{

                            templateUrl: 'product/views/menu/product/product-event.html'
                        }

                    }

                });

            $stateProvider.state('announcement', {
                    url: '/announcement',
                    views:{
                        '':{
                            templateUrl: 'product/views/slidepanels/management.html',
                            controller: 'SlidePanelContentController'
                        },
                        'lefttree@announcement':{
                            templateUrl: 'product/views/menu/management/management-tree.html',
                            controller: 'SlidePanelContentController'
                        },
                        'righttabs@announcement':{

                            templateUrl: 'product/views/menu/management/management-announcement.html'
                        }

                    }

                })
                .state('builder', {
                    url: '/builder',
                    views:{
                        '':{
                            templateUrl: 'product/views/slidepanels/management.html'
                            //controller: 'SlidePanelContentController'
                        },
                        'lefttree@builder':{
                            templateUrl: 'product/views/menu/create/create-tree.html',
                            controller: 'SlidePanelContentController'
                        },
                        'righttabs@builder':{

                            templateUrl: 'product/views/menu/management/management-create.html'
                        }

                    }

                });

           $stateProvider.state('calendar', {
                url: '/calendar',
                views:{
                    '':{
                        templateUrl: 'product/views/slidepanels/calendar.html',
                        controller: 'SlidePanelContentController'
                    },
                    'calenderview@calendar':{
                        templateUrl: 'product/views/menu/calendar/calendarview.html',
                        controller: 'SlidePanelContentController'
                    }
                }
            });

            $stateProvider.decorator('$state', function($delegate, $stateParams) {
                $delegate.forceReload = function() {
                    return $delegate.go($delegate.current, $stateParams, {
                        reload: true,
                        inherit: false,
                        notify: true
                    });
                };
                return $delegate;
            });


        }
    ]);

/*
 .state('product.class', {
 url: '/product-class',
 templateUrl: 'product/views/menu/product-data.html',
 controller: 'SlidePanelContentController'
 })
 .state('product.class.tab-1', {
 url: '/product-class/tab-1',
 templateUrl: 'product/views/menu/product-listclass.html'
 })
 .state('product.class.tab-2', {
 url: '/product-class/tab-2',
 templateUrl: 'product/views/menu/product-createtclass.html'
 })
    */

'use strict';

// Declare app level module which depends on filters, and services
angular.module('mean.admin.slidepanel', ['ngCookies','ngResource','ngSanitize','ui.router'])
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

        //$locationProvider.html5Mode(true).hashPrefix('!');
        $stateProvider.state('managementusers', {
          url: '/managementusers',
          views:{
            '':{
              templateUrl: 'admin/views/menu/management.html'
            },
            'lefttree@managementusers':{
              templateUrl: 'admin/views/menu/management-tree.html',
              controller: 'AdminSlidePanelContentController'
            },
            'righttabs@managementusers':{

              templateUrl: 'admin/views/menu/management-user.html'
            }
          }
        });

       /* $stateProvider.decorator('$state', function($delegate, $stateParams) {
          $delegate.forceReload = function() {
            return $delegate.go($delegate.current, $stateParams, {
              reload: true,
              inherit: false,
              notify: true
            });
          };
          return $delegate;
        });*/


      }
    ]);


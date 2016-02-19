'use strict';

angular.module('mean.page').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('page example page', {
      url: '/page/example',
      templateUrl: 'page/views/index.html'
    });
  }
]);

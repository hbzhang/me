'use strict';

angular.module('mean.helpers').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('helpers example page', {
      url: '/helpers/example',
      templateUrl: 'helpers/views/index.html'
    });
  }
]);

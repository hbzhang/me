'use strict';

angular.module('mean.workspace').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('workspace example page', {
      url: '/workspace/example',
      templateUrl: 'workspace/views/index.html'
    });
  }
]);

'use strict';

angular.module('mean.account').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('account example page', {
      url: '/account/example',
      templateUrl: 'account/views/index.html'
    });
  }
]);

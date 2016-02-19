'use strict';

angular.module('mean.front').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('front example page', {
      url: '/front/example',
      templateUrl: 'front/views/index.html'
    });
  }
]);

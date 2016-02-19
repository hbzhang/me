'use strict';

angular.module('mean.timeline').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('timeline example page', {
      url: '/timeline/example',
      templateUrl: 'timeline/views/index.html'
    });
  }
]);

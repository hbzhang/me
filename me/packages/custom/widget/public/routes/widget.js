'use strict';

angular.module('mean.widget').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('widget example page', {
      url: '/widget/example',
      templateUrl: 'widget/views/index.html'
    });
  }
]);

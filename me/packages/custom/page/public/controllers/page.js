'use strict';

/* jshint -W098 */
angular.module('mean.page').controller('PageController', ['$scope', 'Global', 'Page',
  function($scope, Global, Page) {
    $scope.global = Global;
    $scope.package = {
      name: 'page'
    };
  }
]);

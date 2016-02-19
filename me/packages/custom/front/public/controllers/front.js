'use strict';

angular.module('mean.front').controller('FrontController', ['$scope', 'Global', 'Front',
  function($scope, Global, Front) {
    $scope.global = Global;
    $scope.package = {
      name: 'front'
    };
  }
]);

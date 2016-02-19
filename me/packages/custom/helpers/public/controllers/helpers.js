'use strict';

angular.module('mean.helpers').controller('HelpersController', ['$scope', 'Global', 'Helpers',
  function($scope, Global, Helpers) {
    $scope.global = Global;
    $scope.package = {
      name: 'helpers'
    };
  }
]);

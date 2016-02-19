'use strict';

angular.module('mean.timeline').controller('TimelineController', ['$scope', 'Global', 'Timeline',
  function($scope, Global, Timeline) {
    $scope.global = Global;
    $scope.package = {
      name: 'timeline'
    };
  }
]);

'use strict';

angular.module('mean.widget').controller('WidgetController', ['$scope', 'Global', 'Widget',
  function($scope, Global, Widget) {
    $scope.global = Global;
    $scope.package = {
      name: 'widget'
    };
  }
]);

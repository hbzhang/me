'use strict';

angular.module('mean.workspace').controller('WorkspaceController', ['$scope', 'Global', 'Workspace',
  function($scope, Global, Workspace) {
    $scope.global = Global;
    $scope.package = {
      name: 'workspace'
    };
  }
]);

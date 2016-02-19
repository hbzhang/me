/**
 * Created by hbzhang on 5/4/15.
 */
'use strict';

angular.module('mean.admin').controller('GridsterController', ['$scope','Global',
    function($scope, Global) {
        $scope.global = Global;

        $scope.gridsterOpts = {
            margins: [20, 20],
            outerMargin: false,
            pushing: true,
            floating: true,
            draggable: {
                enabled: false
            },
            resizable: {
                enabled: false,
                handles: ['n', 'e', 's', 'w', 'se', 'sw']
            }
        };

        /* $scope.inputItems = [
         { sizeX: 2, sizeY: 5, row: 0, col: 3}
         ]; */

        $scope.treeItems = [
            { sizeX: 2, sizeY: 5, row: 0, col: 0 }
        ];
        $scope.contentItems = [
            { sizeX: 4, sizeY: 6, row: 0, col: 2 }

        ];

        $scope.Items = [
            { size: { x: 1, y: 1 }, position: [0, 0] },
            { size: { x: 4, y: 2 }, position: [0, 2] }
        ];


    }]);

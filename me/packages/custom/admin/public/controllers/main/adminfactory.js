/**
 * Created by hbzhang on 5/26/15.
 */
'use strict';

angular.module('mean.admin').controller('AdminFactoryController', ['$scope','Global','$http',
    'PrivilegeSubMenuHelper','PrivilegeURLItem','PrivilegeAllURLsData',
    function($scope,Global,$http,PrivilegeSubMenuHelper,PrivilegeURLItem,
             PrivilegeAllURLsData) {
        $scope.global = Global;
        $scope.package = {
            name: 'admin'
        };


        PrivilegeURLItem.verifyURLItem(function(display){

            $scope.displaytheitem = display;

        });

        $scope.availableFactoryMenu = [];

        var getMenuItem = function(){

            _.map(PrivilegeAllURLsData.allFactoryMenus,function(item){
                PrivilegeSubMenuHelper.verify_to_Display_menu(item,$scope.global.user.roles,function(item){
                    $scope.availableFactoryMenu.push(item);
                });

            });

        };

        getMenuItem();

    }]);


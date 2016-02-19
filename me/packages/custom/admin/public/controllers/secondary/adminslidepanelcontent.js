/**
 * Created by hbzhang on 2/10/15.
 */
'use strict';

angular.module('mean.admin').controller('AdminSlidePanelContentController', ['$scope','Global','$http',
    'PrivilegeSubMenuHelper','PrivilegeAllURLsData',
    'PrivilegeTestMode',
    function($scope,Global,$http,PrivilegeSubMenuHelper,
             PrivilegeAllURLsData,PrivilegeTestMode) {
        $scope.global = Global;
        // $scope.checked;
        $scope.package = {
            name: 'admin'
        };

        $scope.users = [
            { text: 'manager' }
        ];

        var getMenuItem = function(){

            $scope.availableMenu = [];

            _.map(PrivilegeAllURLsData.allAdminMenus,function(item){
                PrivilegeSubMenuHelper.verify_to_Display_menu(item,$scope.global.user.roles,function(item){
                    $scope.availableMenu.push(item);
                });
            });

            if(PrivilegeTestMode.is_test()) {

                $scope.availableMenu = PrivilegeAllURLsData.allAdminMenus;
            }


        };

        getMenuItem();

        // $scope.pt = SlidePanelContentData.getMeds($route.current.params.id);
    }]);


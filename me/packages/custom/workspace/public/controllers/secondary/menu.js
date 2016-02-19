/**
 * Created by hbzhang on 10/23/14.
 */

angular.module('mean.workspace').controller('WorkspaceSlidePanelContentController', ['$scope','Global',
    'PrivilegeSubMenuHelper','PrivilegeAllURLsData',
    function($scope,Global,PrivilegeSubMenuHelper,PrivilegeAllURLsData) {
        $scope.global = Global;
        $scope.package = {
            name: 'workspace'
        };

        var getMenuItem = function(){

            $scope.availableMenu = [];

            _.map(PrivilegeAllURLsData.workspacemenu,function(item){
                PrivilegeSubMenuHelper.verify_to_Display_menu(item,$scope.global.user.roles,function(item){
                    $scope.availableMenu.push(item);
                });

            });

        };

        getMenuItem();


 }]);

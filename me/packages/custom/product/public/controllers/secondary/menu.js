/**
 * Created by hbzhang on 10/23/14.
 */

angular.module('mean.product').controller('SlidePanelContentController', ['$scope','Global',
    'SlidePanelContentData','PrivilegeSubMenuHelper','PrivilegeAllURLsData',
    function($scope,Global,SlidePanelContentData,
             PrivilegeSubMenuHelper,PrivilegeAllURLsData) {
        $scope.global = Global;
        // $scope.checked;
        $scope.package = {
            name: 'product'
        };

        var getMenuItem = function(){

            $scope.availableMenu = [];

            //console.log(PrivilegeAllURLsData.allBuilderMenus);

            _.map(PrivilegeAllURLsData.allBuilderMenus,function(item){
                PrivilegeSubMenuHelper.verify_to_Display_menu(item,$scope.global.user.roles,function(item){
                    $scope.availableMenu.push(item);
                    //console.log(item);
                });

            });

        };

        getMenuItem();

 }]);

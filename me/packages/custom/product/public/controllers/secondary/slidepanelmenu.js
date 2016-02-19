/**
 * Created by hbzhang on 10/17/14.
 */
'use strict';

angular.module('mean.product').controller('UserPanelController', ['$scope', 'Global', 'Menus',
    '$rootScope', 'PrivilegeHelper','RolesHelper',
    'PrivilegeAllURLsData','PrivilegeTestMode',
    function($scope, Global, Menus,
             $rootScope,PrivilegeHelper,RolesHelper,
             PrivilegeAllURLsData,PrivilegeTestMode) {
        $scope.global = Global;
        $scope.isAdmin = $scope.global.isAdmin;
        $scope.menus = {};
        $scope.overIcon = false;


        $scope.displaymenu = RolesHelper.is_admin($scope.global.user.roles);

        var icons = 'product/assets/img/icons/';

        $scope.allMenu = PrivilegeAllURLsData.rightAdminMenu;

        var getSlideMenuItem = function(){

            $scope.availableMenu = [];

            _.map(PrivilegeAllURLsData.rightAdminMenu,function(item){

                PrivilegeHelper.get_privileges(item.package,$scope.global.user.roles,item,function(item){
                    $scope.availableMenu.push(item);
                    //console.log($scope.availableMenu);
                });

            });

            if(PrivilegeTestMode.is_test()){

                $scope.availableMenu = $scope.allMenu;
            }
        };

        getSlideMenuItem();


        var is_display_menu = function(){

             PrivilegeHelper.verify_to_Display_menu(PrivilegeAllURLsData.rightadminmenu_in_general,function(value) {
                 $scope.displaymenu = value;

            });

        };

        is_display_menu();


        // Query menus added by modules. Only returns menus that users is allowed to see.
        function queryMenu(name, defaultMenu) {

            Menus.query({
                name: name,
                defaultMenu: defaultMenu
            }, function(menu) {
                $scope.menus[name] = menu;
            });
        }

        // Query server for menus and check permissions
        queryMenu('admin', PrivilegeAllURLsData.rightAdminMenu);

        $scope.isCollapsed = false;

        $rootScope.$on('loggedin', function() {

            queryMenu('admin', PrivilegeAllURLsData.rightAdminMenu);

            $scope.global = {
                authenticated: !! $rootScope.user,
                user: $rootScope.user
            };
        });
    }
]);

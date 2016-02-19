/**
 * Created by hbzhang on 10/17/14.
 */
angular.module('mean.product').controller('SlidePanelController', ['$rootScope','$timeout','$location',
    '$http','$scope','Global','PrivilegeHelper',
    function($rootScope,$timeout,$location,$http,$scope, Global,PrivilegeHelper) {
       // $scope.checked;
        $scope.package = {
            name: 'product'
        };

        $scope.isAdmin = Global.isAdmin;

        $rootScope.$on('loggedin', function() {
             $scope.isAuthenticated  = true;
        });

        $scope.isAuthenticated = Global.authenticated;

        $scope.showmenu=true;

        $scope.toggleMenu = function() {
            $scope.showmenu = ($scope.showmenu) ? false : true;

        };

        $rootScope.$on('showadminmenu', function() {
            $scope.toggleMenu();
        });

        $scope.display_left_mean_admin_menu = false;

        var display_admin_menu = function(){

            var item = {
                'label':'Left Admin Menu',
                'role':'admin'
            };

            PrivilegeHelper.verify_to_Display_menu(item,function(value) {
                $scope.display_left_mean_admin_menu = value;
                console.log($scope.display_left_mean_admin_menu );

            });

        };

        display_admin_menu();


    }]);

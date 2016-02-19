'use strict';

angular.module('mean.system').controller('HeaderController', ['$scope',
    'RegisterForm','$rootScope', 'Global', 'Menus','$builder',
    'RegisterAdminFormComponents',
  function($scope, RegisterForm, $rootScope, Global, Menus, $builder,
           RegisterAdminFormComponents) {
    $scope.global = Global;
    $scope.menus = {};


    // Default hard coded menu items for main menu
    var defaultMainMenu = [];

    // Query menus added by modules. Only returns menus that user is allowed to see.
    function queryMenu(name, defaultMenu) {

      Menus.query({
        name: name,
        defaultMenu: defaultMenu
      }, function(menu) {
        $scope.menus[name] = menu;
      });
    }

    // Query server for menus and check permissions
    queryMenu('main', defaultMainMenu);


    $scope.showadminmenu = true;

    $scope.isAdmin = Global.isAdmin;
    $scope.isAuthenticated = Global.authenticated;

    $scope.toggleMenu = function() {
        $rootScope.$broadcast('showadminmenu', {data: $scope.showadminmenu});
    };


   //console.log(window.user);

    $rootScope.$on('loggedin', function() {

      queryMenu('main', defaultMainMenu);

      $scope.global = {
        authenticated: !! $rootScope.user,
        user: $rootScope.user
      };
    });

    RegisterForm.registerforms();
    RegisterAdminFormComponents.registerforms();

  }
]);

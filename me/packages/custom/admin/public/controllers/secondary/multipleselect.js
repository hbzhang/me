/**
 * Created by hbzhang on 5/5/15.
 */
'use strict';

angular.module('mean.admin').controller('MultipleSelectController',  [
    '$rootScope', '$scope','Global','$http','RegisterService',
    'Restangular','toaster','$location','formtoaster','$filter','JSTagsCollection',
    function($rootScope,$scope,Global,$http,RegisterService,Restangular,
             toaster,$location,formtoaster,$filter,JSTagsCollection) {

        $scope.inputprivileges = [
            {	icon: "",	name: "admin",	maker: "",	ticked: false	},
            {	icon: "",	name: "authenticated",	maker: "",	ticked: false	},
            {	icon: "",	name: "public",	maker: "",	ticked: false	}
        ];

        var getprivilegeroles = function() {

           var data = $http.get('/all_roles_for_privileges').
               success(function(data, status, headers, config) {
                   $scope.inputprivileges = data;
                   //console.log(data);
               }).
               error(function(data, status, headers, config) {
                   // called asynchronously if an error occurs
                   // or server returns response with an error status.
               });

        };

        getprivilegeroles();

        $rootScope.$on('privilegetreedataitemclicked', function(event, args) {
           if(!!args.data)
           {
                //console.log(args.data);
                _.map($scope.inputprivileges,function(value){
                    value.ticked = false;
                });
                _.map(args.data.data,function(value){
                    _.map($scope.inputprivileges,function(item){
                        if(value.name ===item.name){
                            item.ticked = true;
                        }
                    });

                });
            }
        });

        $scope.ouputprivileges = [];

      /*  $scope.$watch('ouputprivileges', function() {
            alert('hey, myVar has changed!');
        }); */

        $scope.$watch('ouputprivileges', function(newVal, oldVal) {

            //console.log(newVal);

            $rootScope.$emit('privilegetreeitemdataupdated', {
                data: newVal
            });

        });

}]);

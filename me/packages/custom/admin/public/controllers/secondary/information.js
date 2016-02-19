/**
 * Created by hbzhang on 1/5/15.
 */

'use strict';

angular.module('mean.product').factory('Information',['$resource','$rootScope', function($resource,$rootScope) {

        var eventupdated = {};

        //http://www.objectpartners.com/2013/08/21/using-services-and-messages-to-share-data-between-controllers-in-angularjs/
        eventupdated.broadcastChange = function() {
            $rootScope.$broadcast("eventupdated");
            console.log('broadcast it!');
        };
        return {
            information: $resource('/information/:informationID', {informationID:'@id'},{update: {method: 'PUT'}}, {query: {method: 'GET', params:{}, isArray: true}})
         };

    }]).controller('InformationController', ['toaster', '$scope','Global','$http',
    function(toaster,$scope, Global,$http) {
        $scope.global = Global;
        // $scope.checked;
        $scope.package = {
            name: 'product'
        };
        $scope.pop = function(){
            toaster.pop('success', "", 'The agreement was just created', 4500, 'trustedHtml', 'goToLink');
        };
        //$scope.agreement;
        //console.log($scope.showmenu);
        $scope.agreementSubmit= function() {
            //console.log("agreement submited")
            $http.post('/agreement', {
                agreement: $scope.agreement,
                date: Date.now()
            }).success(function() {
                    //$scope.pop();
                    //$rootScope.users = $scope.users;
                    //$rootScope.$emit('loggedin');
            }).error(function(error) {
                    // Error: authentication failed
                    $scope.agreementError = error;
            });
        };

    }]);



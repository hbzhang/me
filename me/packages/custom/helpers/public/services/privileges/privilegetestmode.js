/**
 * Created by hbzhang on 5/29/15.
 */
'use strict';

angular.module('mean.helpers').factory('PrivilegeTestMode',['$resource','$rootScope', function($resource,$rootScope) {

    var is_test = function(){
        return false;
    };

    return {
        is_test: is_test
    };

}]);
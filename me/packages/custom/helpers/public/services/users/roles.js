/**
 * Created by hbzhang on 5/22/15.
 */
'use strict';

angular.module('mean.helpers').factory('RolesHelper',['$resource','$rootScope', '$http',
    function($resource,$rootScope,$http) {

        var role_exist_in_rolearray = function(role,rolearray) {
            var check_for_role_exist = false;
            _.each(rolearray, function(value) {
                if(role === value){
                    check_for_role_exist = true;
                    //console.log(( value));
                }
            });

            return check_for_role_exist;
        };

        var is_admin = function(rolearray){

          //console.log(rolearray);

          return role_exist_in_rolearray('admin',rolearray);

        };



        return {
            role_exist_in_rolearray: role_exist_in_rolearray,
            is_admin:is_admin
        };
    }]);



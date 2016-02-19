/**
 * Created by hbzhang on 5/26/15.
 */

'use strict';

angular.module('mean.helpers').factory('PrivilegeSubMenuHelper',['$resource','$rootScope', '$http','PrivilegeData',
    function($resource,$rootScope,$http,PrivilegeData) {

        var role_exist = false;

        var verify_privilege_role_item = function(role,rolearray) {
            var check_for_role_exist = false;
            _.each(rolearray, function(value, key) {

                _.map(role, function(roleitem) {
                    if(roleitem === value.name){
                        check_for_role_exist = true;
                        //console.log(( value));
                    }
                });

            });
            return check_for_role_exist;
        };


        var verify_privilege_item = function(data,item,role,callback){
            var role_check_pass = false
            _.each(data, function(value, key) {

                if(value.label === item.label && value.package === item.package){
                if(verify_privilege_role_item(role,value.data)){
                    role_check_pass = true;
                    //console.log( item);
                        //console.log(( role_check_pass));
                        //console.log(( item.url));
                        callback(item);

                }
                }
                if(!!value.children)
                    verify_privilege_item(value.children,item,role,callback);
            });
            //console.log((role_exist));
            return role_check_pass;
        };

        var verify_to_Display_menu =  function(item,role,callback) {
            var my_data = [];
            role_exist = false;
            $http.get('/privileges').
                success(function(data, status, headers, config) {

                    if(!!data[0])
                    {
                        if(data[0].privileges.length ===0)
                            my_data = PrivilegeData.treedata;
                        else
                            my_data = data[0].privileges;
                    }
                    else
                        my_data = PrivilegeData.treedata;

                    var parsed_data = verify_privilege_item(my_data,item,role,callback);

                    return parsed_data;
                }).
                error(function(data, status, headers, config) {
                    my_data = PrivilegeData.treedata;
                    return my_data;
                });

        };


        return {
            verify_to_Display_menu:verify_to_Display_menu
        };
    }]);



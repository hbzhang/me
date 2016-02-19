/**
 * Created by hbzhang on 5/18/15.
 */

'use strict';

angular.module('mean.helpers').factory('PrivilegeHelper',['$resource','$rootScope', '$http','PrivilegeData',
    function($resource,$rootScope,$http,PrivilegeData) {

        var role_exist = false;

        var get_privilege_role_item = function(role,rolearray) {
            var check_for_role_exist = false;

            //console.log(( role));

            _.each(rolearray, function(value, key) {
                _.map(role, function(roleitem) {
                    if(roleitem === value.name){
                        check_for_role_exist = true;
                    }
                });

            });
            return check_for_role_exist;
        };

        var get_privilege_item = function(packagename,role,data,item,callback){
            _.each(data, function(value, key) {
                if(packagename === value.package)
                if(get_privilege_role_item(role,value.data)){
                    role_exist = true;
                    //console.log(( value));
                    if(value.label === item.label)
                    callback(item);

                }
                if(!!value.children)
                get_privilege_item(packagename,role,value.children,item,callback);
            });
            //console.log((role_exist));
            return role_exist;
        };

        var is_authenticated_for_this_item =  function(packagename,role,item,callback) {
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

                var parsed_data = get_privilege_item(packagename,role,my_data,item,callback);

                //console.log((parsed_data));

                return parsed_data;
            }).
            error(function(data, status, headers, config) {
                my_data = PrivilegeData.treedata;
                return my_data;
            });

        };


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




        var verify_privilege_item = function(data,item,callback){
            var role_check_pass = false
            _.each(data, function(value, key) {

                if(value.label === item.label && value.package === item.package){
                    if(verify_privilege_role_item(item.role,value.data)){
                        role_check_pass = true;
                            //console.log(( role_check_pass));
                            //console.log(( item.label));
                        callback(role_check_pass);
                        }
                    }
                if(!!value.children)
                    verify_privilege_item(value.children,item,callback);
            });
            //console.log((role_exist));
            return role_check_pass;
        };



        var verify_to_Display_menu =  function(item,callback) {
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

                    var parsed_data = verify_privilege_item(my_data,item,callback);

                    return parsed_data;
                }).
                error(function(data, status, headers, config) {
                    my_data = PrivilegeData.treedata;
                    return my_data;
                });

        };


       return {
           get_privileges: is_authenticated_for_this_item,
           verify_to_Display_menu:verify_to_Display_menu
       };
}]);



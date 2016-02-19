/**
 * Created by hbzhang on 5/27/15.
 */
'use strict';

angular.module('mean.helpers').factory('PrivilegeURLItem',['$resource','$rootScope', '$http',
    'PrivilegeAllURLsData','$location','Global',
    function($resource,$rootScope,$http,
             PrivilegeAllURLsData,$location,Global) {

        var role_exist = false;

        var verify_privilege_role_item = function(role,rolearray) {
            //console.log(( rolearray));
            var check_for_role_exist = false;
            _.each(rolearray, function(value, key) {

                _.map(role, function(roleitem) {
                    if(roleitem === value.name){
                        check_for_role_exist = true;
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
                    callback(role_check_pass);
                    //console.log(( item.url));
                    return role_check_pass;
                    }
                }
                if(!!value.children)
                    verify_privilege_item(value.children,item,role,callback);
            });
            //console.log((role_exist));
            return role_check_pass;
        };


        var verify_to_Display_Item =  function(item,role,callback) {
            var my_data = [], itemurl;
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

                    itemurl = $location.path().split('/')[1];

                    if(itemurl === item.url) {
                        verify_privilege_item(my_data, item, role,callback);
                    }

                }).
                error(function(data, status, headers, config) {
                    //callback(parsed_data);
                });

        };

        var verifyURLItem = function(callback){

            callback(false); //make sure it has some value

            _.map(PrivilegeAllURLsData.allFactoryMenus,function(item){
                verify_to_Display_Item(item,Global.user.roles,callback);

            });

            _.map(PrivilegeAllURLsData.allAdminMenus,function(item){
                verify_to_Display_Item(item,Global.user.roles,callback);
            });

        };

        return {
            verifyURLItem:verifyURLItem
        };
    }]);



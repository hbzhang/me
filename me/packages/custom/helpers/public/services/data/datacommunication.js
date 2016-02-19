/**
 * Created by hbzhang on 6/5/15.
 */
'use strict';

angular.module('mean.helpers').factory('DataCommunication',['$resource','$rootScope',
    'ItemData','$timeout',
    function($resource,$rootScope,ItemData,$timeout) {

     var adminformrole = [], formcoverphotoid='';

     $rootScope.$on('adminformrolefetched', function(event, args) {

         adminformrole = args.data;

         $rootScope.$emit('adminformroleready', {
             data:  adminformrole
         })

         /*$timeout($rootScope.$emit('adminformroleready', {
             data:  adminformrole
         }), 3000);*/

     });

     $rootScope.$on('formcoverphotouploaded', function(event, args) {

            if (!!args.data) {

                formcoverphotoid = args.data;

            }
     });

    var SendFormcoverphoto = function SendFormcoverphoto(scope,value){


        $rootScope.$emit('formcoverphotofetched', {
            data: value
        });


    };


   var getAdminFormrole = function getAdminFormrole() {

        return adminformrole;
   };

   var getFormcoverphoto = function getFormcoverphoto(){

         return formcoverphotoid;
   };

   return {
        getAdminFormrole: getAdminFormrole,
        getFormcoverphoto:getFormcoverphoto,
        SendFormcoverphoto:SendFormcoverphoto
    };
}]);



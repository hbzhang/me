/**
 * Created by hbzhang on 5/22/15.
 */

'use strict';

angular.module('mean.helpers').factory('ModulesHelper',['$resource','$rootScope', '$http','Modules',
    function($resource,$rootScope,$http,Modules) {

        var all_modules = function (callback){
            var allmodules = [];

            Modules.get(function(data) {

                _.map(data, function(module, info){

                    var el = {
                        text: info,
                        value: info
                    };

                    allmodules.push(el);
                });
                callback(allmodules);
            });

        };


        return {
            all_modules: all_modules
        };
    }]);






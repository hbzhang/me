/**
 * Created by hbzhang on 15/5/2.
 */
'use strict';

angular.module('mean.helpers').factory('DataFilterHelper',['$resource','$rootScope', function($resource,$rootScope) {


    var filter_array_with_array = function consolidatedFilters(passedArray, passedFilter) {
        var filteredArray = passedArray.filter(
            function(el) { // executed for each person
                for (var i = 0; i < passedFilter.length; i++) { // iterate over filter
                    if (el[1].indexOf(passedFilter[i]) != -1) {
                        return true; // if this person knows this language
                    }
                }
                return false;
            }
        );
        return filteredArray;
    }


   var filter_object_with_array = function filterProps(obj, filter) {
        for (prop in obj) {
            if (filter.indexOf(prop) == -1) {
                delete obj[prop];
            }
        };
        return obj;
    };

    var filter_object_with_object = function filterObject(obj, filter) {
        var newObj = {};

        for (var i=0; i<filter.length; i++) {
            newObj[filter[i]] = obj[filter[i]];
        }
        return newObj;
    }

    return {
        filter_object_with_array: filter_object_with_array,
        filter_object_with_object:filter_object_with_object,
        filter_array_with_array:filter_array_with_array
    };
}]);



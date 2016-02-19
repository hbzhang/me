/**
 * Created by hbzhang on 3/25/15.
 */
'use strict';

angular.module('mean.front').factory('Item',['$resource','$rootScope', function($resource,$rootScope) {

    return {
        programarray: programarray,
        childprograms: childprograms,
        specificchildprogram:specificchildprogram,
        rootprogram:rootprogram,
        is_contains_program:is_contains_program,
        arbitarychildprograms:arbitarychildprograms
    };
}]);




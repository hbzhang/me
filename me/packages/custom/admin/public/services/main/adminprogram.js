/**
 * Created by hbzhang on 2/20/15.
 */
'use strict';

angular.module('mean.admin').factory('CreateProgram',['$resource','$rootScope', function($resource,$rootScope) {

    return {
        validationRules: {
            name: {
                required: true
            }
        },
        submit: function(data) {
            var deferred = $q.defer();
            $timeout(function() {
                deferred.reject('Your form has been submitted');
            }, 1000);
            return deferred.promise;
        },
       form: $resource('program/:programID', {eventID:'@id'},{update: {method: 'PUT'}}, {query: {method: 'GET', params:{}, isArray: true}})
    };

}]);

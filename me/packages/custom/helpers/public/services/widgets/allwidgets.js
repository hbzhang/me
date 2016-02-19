/**
 * Created by hbzhang on 8/5/15.
 */
'use strict';

angular.module('mean.helpers').factory('AllWidgetData',['$resource','$rootScope', function($resource,$rootScope) {

    var allwidgets=[
            {
                name: 'Announcement',
                data: []
            },
            {
                name: 'Information',
                data: []
            }
       ];

    return {
        allwidgets:allwidgets
    };

}]);

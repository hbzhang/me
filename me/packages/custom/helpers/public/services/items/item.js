/**
 * Created by hbzhang on 6/2/15.
 */
'use strict';

angular.module('mean.helpers').factory('ItemData',['$resource','$rootScope', function($resource,$rootScope) {

    var tools = [
        {
            label: 'Report',
            data: []
        }
    ];

    var manage = [ {
        label: 'Edit',
        data: []
    },
        {
            label: 'Delete',
            data: []
        },
        {
            label: 'Visibility',
            data: []
        },
        {
            label: 'Tools',
            data: [],
            children: tools
        }];

    var item = [
        {
            label: 'Create',
            data: []
        },
        {
            label: 'Manage',
            data: [],
            children: manage
        }
    ];

    var item_privilege = [
        {
            label: 'Who are the end users of the item',
            data: []
        },
        {
            label: 'Who can manage the item(in Builder)',
            data: [],
            children: item
        }
    ];

    return {
        item_privilege: item_privilege,
        item:item
    };

}]);



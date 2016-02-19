/**
 * Created by hbzhang on 5/7/15.
 */

'use strict';

angular.module('mean.helpers').factory('PrivilegeData',['$resource','$rootScope', function($resource,$rootScope) {

 var treedata_example = [
        {
            label: 'North America',
            children: [
                {
                    label: 'Canada',
                    data: {
                        definition: "",
                        data_can_contain_anything: true
                    },
                    onSelect: item_selected,
                     children: ['Toronto', 'Vancouver']
                }, {
                    label: 'USA',
                    data:'leftadminmenu',
                    onSelect: function (branch) {  return $scope.output = branch.data.definition},
                    children: ['New York', 'Los Angeles']
                }, {
                    label: 'Mexico',
                    children: ['Mexico City', 'Guadalajara']
                }
            ]
        }
 ];

  var treedata = [
        {
            label: 'Right Admin Menu',
            data: [],
            package:'PACKAGE-COLLECTION',
             children: [
                {
                    label: 'Workspace',
                    data: [],
                    package:'workspace',
                    children: [
                        {
                            label: 'Items',
                            data: [],
                            package:'workspace'
                        },
                        {
                            label: 'Auxiliary',
                            data: [],
                            package:'workspace'
                        }
                    ]
                },
                {
                    label: 'Builder',
                    data: [],
                    package:'product',
                    children: [
                        {
                            label: 'Items',
                            data: [],
                            package:'product'
                         },
                        {
                            label: 'Auxiliary',
                            data: [],
                            package:'product'
                        }
                    ]
                },
                {
                    label: 'Admin',
                    data: [],
                    package:'admin',
                    children: [
                        {
                            label: 'Factory',
                            data: [],
                            package:'admin',
                            children: [
                                {
                                    label: 'Program',
                                    data: [],
                                    package:'admin'
                                },
                                {
                                    label: 'Form',
                                    data: [],
                                    package:'admin'
                                },
                                {
                                    label: 'Widget',
                                    data: [],
                                    package:'admin'
                                },
                                {
                                    label: 'Agreement',
                                    data: [],
                                    package:'admin'
                                }
                            ]
                        },
                        {
                            label: 'User',
                            data: [],
                            package:'admin'
                        },
                        {
                            label: 'Privilege',
                            data: [],
                            package:'admin'
                        }
                    ]

                }]
        },
        {
          label: 'Account',
          data: [],
          package:'PACKAGE-COLLECTION',
          children: [
              {
                  label: 'Orders',
                  data: [],
                  package:'account'
              },
              {
                  label: 'Shopping Cart',
                  data: [],
                  package:'account'
              }
          ]
      },

    ];

    return {
        treedata: treedata
    };

}]);



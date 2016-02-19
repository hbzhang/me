/**
 * Created by hbzhang on 5/26/15.
 */

'use strict';

angular.module('mean.admin').config(['$stateProvider',
    function($stateProvider) {
        $stateProvider
            .state('admin-factory', {
                url: '/admin-factory',
                views:{
                    '':{
                        templateUrl: 'product/views/slidepanels/management.html'
                        //controller: 'SlidePanelContentController'
                    },
                    'lefttree@admin-factory':{
                        templateUrl: 'admin/views/menu/management-tree.html',
                        controller: 'AdminSlidePanelContentController'
                    },
                    'righttabs@admin-factory':{

                        templateUrl: 'admin/views/menu/management-admin.html',
                        controller: 'AdminFactoryController'
                    }

                }

            });

    }
]);



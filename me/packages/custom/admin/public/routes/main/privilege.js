/**
 * Created by hbzhang on 5/4/15.
 */
'use strict';

angular.module('mean.admin').config(['$stateProvider',
    function($stateProvider) {
        $stateProvider
            .state('privilege', {
                url: '/privilege',
                views:{
                    '':{
                        templateUrl: 'admin/views/menu/management.html'
                        //controller: 'SlidePanelContentController'
                    },
                    'lefttree@privilege':{
                        templateUrl: 'admin/views/menu/management-tree.html',
                        controller: 'AdminSlidePanelContentController'
                    },
                    'righttabs@privilege':{

                        templateUrl: 'admin/views/menu/management-privilege.html'
                    }

                }

            });

    }
]);

/**
 * Created by hbzhang on 2/20/15.
 */
'use strict';

angular.module('mean.admin').config(['$stateProvider',
    function($stateProvider) {
        $stateProvider
            .state('createprogram', {
                url: '/createprogram',
                views:{
                    '':{
                        templateUrl: 'admin/views/menu/management.html'
                        //controller: 'SlidePanelContentController'
                    },
                    'lefttree@createprogram':{
                        templateUrl: 'admin/views/menu/management-tree.html',
                        controller: 'AdminSlidePanelContentController'
                    },
                    'righttabs@createprogram':{

                        templateUrl: 'admin/views/program/createprogram.html',
                        controller: 'AdminProgramController'
                    }

                }

            });

    }
]);

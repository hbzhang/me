'use strict';

angular.module('mean.product').config(['$stateProvider',
    function($stateProvider) {
        $stateProvider
            .state('form announcement', {
                url: '/announcement/form',
                templateUrl: 'product/views/management/create_announcement.html'
            })
            .state('announcements', {
                url: '/announcement',
                templateUrl: 'product/views/management/view_announcement.html'
            })
            .state('form class', {
                url: '/class/form',
                templateUrl: 'product/views/product/class/form.html'
            })
            .state('instructor class', {
                url: '/class/instructor/:instructorId',
                templateUrl: 'product/views/product/class/instructor.html'
            })
            .state('location class', {
                url: '/class/location/:location',
                templateUrl: 'product/views/product/class/location.html'
            })
            .state('my class', {
                url: '/class/myclass/:studentId',
                templateUrl: 'product/views/product/class/myclass.html'
            })
            .state('class', {
                url: '/class',
                templateUrl: 'product/views/product/class/list.html'
            })
            .state('view class', {
                url: '/class/view/:classId',
                templateUrl: 'product/views/product/class/view.html'
            })
            .state('edit class', {
                url: '/class/edit/:classId',
                views:{
                    '':{
                        templateUrl: 'product/views/slidepanels/management.html'
                        //controller: 'SlidePanelContentController'
                    },
                    'lefttree@edit class':{
                        templateUrl: 'workspace/views/menu/product-tree.html',
                        controller: 'WorkspaceSlidePanelContentController'
                    },
                    'righttabs@edit class':{

                        templateUrl: 'product/views/product/class/edit.html'
                        //controller: 'EventFormBuilderController'
                    }

                }

            })
            .state('class calendar', {
                url: '/class/calendar',
                templateUrl: 'product/views/management/calendar/calendar.html'
            })
            .state('classnew', {
                url: '/classnew',
                views:{
                    '':{
                        templateUrl: 'product/views/slidepanels/management.html'
                        //controller: 'SlidePanelContentController'
                    },
                    'lefttree@classnew':{
                        templateUrl: 'workspace/views/menu/product-tree.html',
                        controller: 'WorkspaceSlidePanelContentController'
                    },
                    'righttabs@classnew':{

                        templateUrl: 'product/views/product/class/create.html'
                        //controller: 'EventFormBuilderController'
                    }

                }

            });
    }
]);

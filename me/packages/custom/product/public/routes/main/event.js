/**
 * Created by hbzhang on 10/17/14.
 */
angular.module('mean.product').config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
    function($stateProvider, $urlRouterProvider, $locationProvider,$provide)  {
        $stateProvider
            .state('eventedit', {
                url: '/event/edit/:eventID',
                views:{
                    '':{
                        templateUrl: 'product/views/slidepanels/management.html'
                        //controller: 'SlidePanelContentController'
                    },
                    'lefttree@eventedit':{
                        templateUrl: 'workspace/views/menu/product-tree.html',
                        controller: 'WorkspaceSlidePanelContentController'
                    },
                    'righttabs@eventedit':{

                        templateUrl: 'product/views/product/event/event-edit.html'
                    }

                }

            })
            .state('eventnew', {
                url: '/eventnew',
                views:{
                    '':{
                        templateUrl: 'product/views/slidepanels/management.html'
                        //controller: 'SlidePanelContentController'
                    },
                    'lefttree@eventnew':{
                        templateUrl: 'workspace/views/menu/product-tree.html',
                        controller: 'WorkspaceSlidePanelContentController'
                    },
                    'righttabs@eventnew':{

                        templateUrl: 'product/views/product/event/event-create.html',
                        controller: 'EventFormBuilderController'
                    }

                }

            });
    }
]);

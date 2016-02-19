/**
 * Created by hbzhang on 1/5/15.
 */
angular.module('mean.product').config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
    function($stateProvider, $urlRouterProvider, $locationProvider,$provide)  {
        $stateProvider
            .state('informationedit', {
                url: '/information/edit/:informationID',
                templateUrl: 'product/views/product/information/information-edit.html'
            })
            .state('legalagreement', {
                url: '/legalagreement',
                views:{
                    '':{
                        templateUrl: 'admin/views/menu/management.html'
                        //controller: 'SlidePanelContentController'
                    },
                    'lefttree@legalagreement':{
                        templateUrl: 'admin/views/menu/management-tree.html',
                        controller: 'AdminSlidePanelContentController'
                    },
                    'righttabs@legalagreement':{

                        templateUrl: 'admin/views/information/agreement-create.html'
                    }

                }

            });
    }
]);

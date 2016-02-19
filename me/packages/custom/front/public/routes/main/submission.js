/**
 * Created by hbzhang on 3/17/15.
 */
angular.module('mean.front').config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
    function($stateProvider, $urlRouterProvider, $locationProvider,$provide)  {
        $stateProvider
            .state('submission', {
                url: '/public/submission/:contentID',
                views:{
                    '':{
                        templateUrl: 'front/views/frame/index/mainmenu.html'
                        //controller: 'SlidePanelContentController'
                    },
                    'lefttree@submission':{
                        templateUrl: 'front/views/frame/framepanel/mainmenu-tree.html'
                    },
                    'righttabs@submission':{

                        templateUrl: 'front/views/frame/frameedit/registrationedit.html'
                    }

                }

            });
    }
]);

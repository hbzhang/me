/**
 * Created by hbzhang on 3/17/15.
 */
angular.module('mean.front').config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
    function($stateProvider, $urlRouterProvider, $locationProvider,$provide)  {
        $stateProvider
            .state('publicprogram', {
                url: '/public/program/:programID',
                views:{
                    '':{
                        templateUrl: 'front/views/frame/index/mainmenu.html'
                        //controller: 'SlidePanelContentController'
                    },
                    'lefttree@publicprogram':{
                        templateUrl: 'front/views/frame/framepanel/mainmenu-tree.html'
                    },
                    'righttabs@publicprogram':{

                        templateUrl: 'front/views/frame/framecontent/mainmenu-content.html'
                    }

                }

            })
            .state('subprogram', {
                url: '/public/subprogram/:subprogramID',
                views:{
                    '':{
                        templateUrl: 'front/views/frame/index/mainmenu.html'
                        //controller: 'SlidePanelContentController'
                    },
                    'lefttree@subprogram':{
                        templateUrl: 'front/views/frame/framepanel/mainmenu-tree.html'
                    },
                    'righttabs@subprogram':{

                        templateUrl: 'front/views/frame/framecontent/mainmenu-content.html'
                    }

                }

            })
            .state('secondsubprogram', {
                url: '/public/secondsubprogram/:subprogramID',
                views:{
                    '':{
                        templateUrl: 'front/views/frame/index/mainmenu.html'
                        //controller: 'SlidePanelContentController'
                    },
                    'lefttree@secondsubprogram':{
                        templateUrl: 'front/views/frame/framepanel/mainmenu-tree.html'
                    },
                    'righttabs@secondsubprogram':{
                        templateUrl: 'front/views/frame/framecontent/second-mainmenu-content.html'
                    }
                }
            })
            .state('content', {
                url: '/public/content/:contentID',
                views:{
                    '':{
                        templateUrl: 'front/views/frame/index/mainmenu.html'
                        //controller: 'SlidePanelContentController'
                    },
                    'lefttree@content':{
                        templateUrl: 'front/views/frame/framepanel/mainmenu-tree.html'
                    },
                    'righttabs@content':{

                        templateUrl: 'front/views/frame/framecontent/content-display.html'
                    }

                }

            });
    }
]);

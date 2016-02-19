/**
 * Created by hbzhang on 7/20/15.
 */
'use strict';

angular.module('mean.helpers').factory('FrontPageDataHelper',['$resource','$rootScope', function($resource,$rootScope) {


    var back_button = {
        label: 'Back',
        data: {
            link: '',
            image: {icon:'fa fa-3x fa-reply'},
            root:'no',
            parent:''
        },
        children:[]
    };


     var sharepoint = [ {
        label: 'Health And Safety',
        data: {
            link: '',
            image: {icon:'fa fa-3x fa-users'},
            root:'yes',
            parent:''
        },
        children:
            [
                {
                    label: 'Recreational Sports',
                    data: {
                        link: 'recsports.vt.edu',
                        image: {icon:'fa fa-3x fa-users'},
                        root:'no',
                        parent:'Health And Safety'
                    },
                    children:[]
                },
                {
                    label: 'Schiffert Health Center',
                    data: {
                        link: 'www.healthcenter.vt.edu',
                        image: {icon:'fa fa-3x fa-users'},
                        root:'no',
                        parent:'Health And Safety'
                    },
                    children:[]
                },
                {
                    label: 'Cook Counseling Center',
                    data: {
                        link: 'www.ucc.vt.edu',
                        image: {icon:'fa fa-3x fa-users'},
                        root:'no',
                        parent:'Health And Safety'
                    },
                    children:[]
                },
                {
                    label: 'Services for Students with Disabilities',
                    data: {
                        link: 'www.ssd.vt.edu',
                        image: {icon:'fa fa-3x fa-users'},
                        root:'no',
                        parent:'Health And Safety'
                    },
                    children:[]
                }

         ]

      }
    ];

    var DSATools = [ {
        label: 'Production tools',
        data: {
            link: '',
            image: {icon:'fa fa-3x fa-users'},
            root:'yes',
            parent:''
        },
        children:
            [
                {
                    label: 'Recreational Sports',
                    data: {
                        link: 'recsports.vt.edu',
                        image: {icon:'fa fa-3x fa-users'},
                        root:'no',
                        parent:'Production tools'
                    },
                    children:[]
                },
                {
                    label: 'Schiffert Health Center',
                    data: {
                        link: 'www.healthcenter.vt.edu',
                        image: {icon:'fa fa-3x fa-users'},
                        root:'no',
                        parent:'Production tools'
                    },
                    children:[]
                },
                {
                    label: 'Cook Counseling Center',
                    data: {
                        link: 'www.ucc.vt.edu',
                        image: {icon:'fa fa-3x fa-users'},
                        root:'no',
                        parent:'Production tools'
                    },
                    children:[]
                },
                {
                    label: 'Services for Students with Disabilities',
                    data: {
                        link: 'www.ssd.vt.edu',
                        image: {icon:'fa fa-3x fa-users'},
                        root:'no',
                        parent:'Production tools'
                    },
                    children:[]
                }

            ]

    }
    ];



    return {
        DSATools:DSATools,
        sharepoint:sharepoint,
        back_button:back_button


    };
}]);

/**
 * Created by hbzhang on 6/26/15.
 */
'use strict';

angular.module('mean.helpers').factory('RegisterAdminFormComponents',['$resource', '$builder',
    '$rootScope', '$navtree',
    function($resource,$builder,$rootScope,$navtree) {

        var addforms = function() {

            var rootname = 'Group 1';
            var name = 'Form';

            var id = $navtree.gen_nav_tree_random_string();
            var id1 = $navtree.gen_nav_tree_random_string();

            $builder.registerComponent('formname', {
                nav_tree: [{
                    root: rootname,
                    uniqueid: id,
                    parentid: '',
                    data: [{
                        visible:false,
                        componentname:'formname'
                    }],
                    group: name,
                    layer: 1,
                    child: [{
                        root: rootname,
                        uniqueid: id1,
                        parentid: id,
                        data: [],
                        group: 'A',
                        layer: 2,
                        child: []
                    }]
                }],
                group: name,
                label: 'Form name ',
                description: '',
                placeholder: 'placeholder',
                required: false,
                validationOptions: [
                    {
                        label: 'none',
                        rule: '/.*/'
                    }, {
                        label: 'number',
                        rule: '[number]'
                    }, {
                        label: 'email',
                        rule: '[email]'
                    }, {
                        label: 'url',
                        rule: '[url]'
                    }
                ],
                templateUrl: 'helpers/views/registerformcomponents/formname.html',
                popoverTemplateUrl: 'helpers/views/registerformcomponents/formnamepopover.html'
            });

            var id = $navtree.gen_nav_tree_random_string();
            var id1 = $navtree.gen_nav_tree_random_string();

            $builder.registerComponent('formcoverphotoupload', {
                nav_tree: [{
                    root: rootname,
                    uniqueid: id,
                    parentid: '',
                    data: [{
                        visible:false,
                        componentname:'formcoverphotoupload'
                    }],
                    group: name,
                    layer: 1,
                    child: [{
                        root: rootname,
                        uniqueid: id1,
                        parentid: id,
                        data: [],
                        group: 'A',
                        layer: 2,
                        child: []
                    }]
                }],
                group: name,
                label: 'form cover photo upload ',
                description: '',
                placeholder: 'placeholder',
                required: false,
                validationOptions: [

                ],
                templateUrl: 'helpers/views/registerformcomponents/formcoverphotoupload.html',
                popoverTemplateUrl: 'helpers/views/registerformcomponents/formcoverphotouploadpopup.html'
            });

        };

        return {
            registerforms:addforms
        };

    }]);

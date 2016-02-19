/**
 * Created by hbzhang on 3/10/15.
 */
'use strict';

angular.module('mean.helpers').factory('RegisterForm',['$resource', '$builder',
    '$rootScope', '$navtree',
    function($resource,$builder,$rootScope,$navtree) {

        var addforms = function() {

        var rootname = 'Group 2';
        var name = 'Default';

        var id = $navtree.gen_nav_tree_random_string();
        var id1 = $navtree.gen_nav_tree_random_string();

        $builder.registerComponent('programlist', {
            nav_tree:[{
                root: rootname,
                uniqueid:id,
                parentid:'',
                data: [],
                group: 'Admin',
                layer: 1,
                child:[{
                    root: rootname,
                    uniqueid:id1,
                    parentid:id,
                    data: [{
                        visible:true,
                        componentname:'programlist'
                    }],
                    group: 'Program',
                    layer: 2,
                    child:[]
                }]
            }],
            group: 'Admin',
            label: 'Program List: ',
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
            templateUrl: 'admin/views/templates/program/programlist.html',
            popoverTemplateUrl: 'admin/views/templates/program/programlistpopover.html'
        });

            var id = $navtree.gen_nav_tree_random_string();
            var id1 = $navtree.gen_nav_tree_random_string();

            $builder.registerComponent('widgetlist', {
                nav_tree:[{
                    root: rootname,
                    uniqueid:id,
                    parentid:'',
                    data: [],
                    group: 'Admin',
                    layer: 1,
                    child:[{
                        root: rootname,
                        uniqueid:id1,
                        parentid:id,
                        data: [{
                            visible:true,
                            componentname:'widgetlist'
                        }],
                        group: 'Widget',
                        layer: 2,
                        child:[]
                    }]
                }],
                group: 'Widget',
                label: 'Widget List: ',
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
                templateUrl: 'admin/views/templates/widget/widgetlist.html',
                popoverTemplateUrl: 'admin/views/templates/widget/widgetlistpopover.html'
            });

            var id = $navtree.gen_nav_tree_random_string();
            var id1 = $navtree.gen_nav_tree_random_string();


        var id = $navtree.gen_nav_tree_random_string();
        var id1 = $navtree.gen_nav_tree_random_string();

        $builder.registerComponent('eventdescription', {
            nav_tree:[{
                root: rootname,
                uniqueid:id,
                parentid:'',
                data: [{
                    visible:true,
                    componentname:'eventdescription'
                }],
                group: 'Builder',
                layer: 1,
                child:[{
                    root: rootname,
                    uniqueid:id1,
                    parentid:id,
                    data: [],
                    group: 'Event',
                    layer: 2,
                    child:[]
                }]
            }],
            group: 'Builder',
            label: 'Event Description: ',
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
            templateUrl: 'product/views/templates/formbuilder/event/eventdescription_template.html',
            popoverTemplateUrl: 'product/views/templates/formbuilder/event/eventdescriptionpopover.html'
        });

        var id = $navtree.gen_nav_tree_random_string();
        var id1 = $navtree.gen_nav_tree_random_string();

        $builder.registerComponent('eventaddmore', {
            nav_tree:[{
                root: rootname,
                uniqueid:id,
                parentid:'',
                data: [{
                    visible:true,
                    componentname:'eventaddmore'
                }],
                group: 'Builder',
                layer: 1,
                child:[{
                    root: rootname,
                    uniqueid:id1,
                    parentid:id,
                    data: [],
                    group: 'Event',
                    layer: 2,
                    child:[]
                }]
            }],
            group: 'Builder',
            label: 'Register for Event Affiliates(Optional): ',
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
            templateUrl: 'product/views/templates/formbuilder/event/add_person_template.html',
            popoverTemplateUrl: 'product/views/templates/formbuilder/event/popoverTemplate.html'
        });


        return this;

    };

    return {
        registerforms:addforms
    };

}]);

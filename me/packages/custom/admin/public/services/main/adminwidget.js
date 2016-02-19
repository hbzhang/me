/**
 * Created by hbzhang on 8/5/15.
 */
'use strict';

angular.module('mean.admin').factory('CreateWidget',['$resource', '$builder','$rootScope','Restangular', function($resource,$builder,$rootScope,Restangular) {

    var builtinwidgetinformation = {
        widgetname: function(form){
//http://stackoverflow.com/questions/7364150/find-object-by-id-in-array-of-javascript-objects
            var obj = _.find(form, function(obj) { return obj.id == 'widgetnametextbox' });
            return obj.value;
        },
        widgettype: function(form){
            var obj = _.find(form, function(obj) { return obj.id == 'widgettypetextbox' });
            return obj.value;
        },
        widgetdescription: function(form){
            // console.log(event);
            var obj = _.find(form, function(obj) { return obj.id == 'widgetdescriptiontextbox' });
            return obj.value;
        }
    };

    var addbuiltinwidgets = (function() {

        this.widgetnametextbox = $builder.addFormObject('widgetbuiltinforms', {
            id: 'widgetnametextbox',
            component: 'textInput',
            label: 'Widget Name',
            description: 'Widget Name',
            placeholder: 'Widget Name',
            required: true,
            editable: false
        });

        this.widgettypetextbox = $builder.addFormObject('widgetbuiltinforms', {
            id: 'widgettypetextbox',
            component: 'widgetlist',
            label: 'Widget Type',
            description: 'Widget',
            placeholder: 'Widget',
            required: true,
            editable: false
        });

        this.widgetdescriptiontextbox = $builder.addFormObject('widgetbuiltinforms', {
            id: 'widgetdescriptiontextbox',
            component: 'textArea',
            label: 'Widget Description',
            description: 'Widget Description',
            placeholder: 'Widget Description',
            required: false,
            editable: false
        });

        return this;

    });
    var widgets = Restangular.all('widget');


    var builtinwidgetnameid = [
        {id: 'widgetnametextbox'}
    ];

    var builtinformwidgettypeid = [
        {id: 'widgettypetextbox'}
    ];

    var builtinwigetdesciptionid = [
        {id: 'widgetdescriptiontextbox'}
    ];

    var getWidget = function() {
        widgets.getList().then(function(widgets) {
            var allWidgets = [];
            _.each(widgets, function(value) {

                var widgetname = _.filter(value.widgetbasicinformation, function(widgetbasic){
                    return _.find(builtinwidgetnameid, function(builtin){
                        return widgetbasic.id === builtin.id;
                    });
                });

                var widgettype= _.filter(value.widgetbasicinformation, function(widgetbasic){
                    return _.find(builtinformwidgettypeid, function(builtin){
                        return widgetbasic.id === builtin.id;
                    });
                });

                var widgetdescription = _.filter(value.widgetbasicinformation, function(widgetbasic){
                    return _.find(builtinwigetdesciptionid, function(builtin){
                        return widgetbasic.id === builtin.id;
                    });
                });

                var widgetinformation = {'id' : value._id, 'name':widgetname, 'program': widgettype, 'description':widgetdescription};

                allWidgets.push(widgetinformation);

            });
            console.log(allWidgets);
            $rootScope.$broadcast('widgetdataready', {data: allWidgets});

            return allWidgets;

        });
    };

    return {
        form: $resource('form/:formID', {eventID:'@id'},{update: {method: 'PUT'}}, {query: {method: 'GET', params:{}, isArray: true}}),
        getwidgets: getWidget,
        builtinwidgets:addbuiltinwidgets,
        builtinwidgetinformation: builtinwidgetinformation
    };

}]);

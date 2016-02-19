/**
 * Created by hbzhang on 8/5/15.
 */
'use strict';

angular.module('mean.admin').controller('AdminWidgetController',
    [   '$location','$rootScope',
        '$scope','Global','$http',
        'formtoaster','Restangular',
        'ItemData', 'PrivilegeURLItem',
        '$builder','AllWidgetData',
        'CreateWidget','$validator',
    function($location,$rootScope,$scope,
             Global,$http,
             formtoaster,Restangular,
             ItemData,PrivilegeURLItem,
             $builder,AllWidgetData,
             CreateWidget,$validator) {

        $scope.global = Global;

        $scope.package = {
            name: 'admin'
        };

        $scope.tree_data =  ItemData.item_privilege;

        $scope.clearforms = function(){

            $rootScope.$emit('needtoclearformlist', {
                data: ''
            });
        };

        $rootScope.$on('adminformroledataupdated', function(event, args) {
            if(args.data.length>=0)
            {
                $scope.widgetroles = args.data;
            }
        });

        PrivilegeURLItem.verifyURLItem(function(display){

            $scope.displaytheitem = display;
        });

        $scope.role_TagOptions = [];


        $scope.pop = function(){
            formtoaster.now.success('Your form was just created.');
        };

        $scope.pop_error = function(){
            formtoaster.now.error('There are errors in your submission. Likely you have forgot to fill out all required fields' +
            ' You have to fix them before you can submit.');
        };

        $builder.removeAllObjects('widgetbuiltinforms');
        $builder.removeAllObjects('createwidgetform');

        $scope.form = $builder.forms['widgetbuiltinforms'];
        $scope.createwidgetformdata = $builder.forms['createwidgetform'];
        $scope.input = [];
        $scope.defaultValue = {};


        CreateWidget.builtinwidgets();


        var widgets = Restangular.all('widget');

        $scope.savewidget = function(){
            //console.log('USERID: ' + $scope.global.user._id);
            return $validator.validate($scope, 'widgetbuiltinforms').success(function() {
                //console.log($scope.createwidgetform);
                var widget = {};
                widget.widgetbasicinformation = $scope.input;
                widget.widgetformbuilder =  $scope.createwidgetformdata;
                widget.widgetcreator = $scope.global.user._id;
                widget.widgetroles = $scope.widgetroles;
                widgets.post(widget);
                $scope.pop();
            }).error(function() {
                $scope.pop_error();
            });
        };

        return $scope.submit = function() {
            return $validator.validate($scope, 'default').success(function() {
                $scope.savewidget();
                return console.log('success');
            }).error(function() {
                return console.log('error');
            });
        };

    // $scope.pt = SlidePanelContentData.getMeds($route.current.params.id);
    }]).controller('AdminWidgetTypeController',
    [   '$location','$rootScope',
        '$scope','Global','$http',
        'formtoaster','Restangular',
        'ItemData', 'PrivilegeURLItem',
        '$builder','AllWidgetData',
        'CreateWidget',
        function($location,$rootScope,$scope,
                 Global,$http,
                 formtoaster,Restangular,
                 ItemData,PrivilegeURLItem,
                 $builder,AllWidgetData,
                 CreateWidget) {

            $scope.global = Global;

            $scope.package = {
                name: 'admin'
            };

            $scope.getwidgets = function() {
                $scope.allAvaiableWidgets = [];

                _.each(AllWidgetData.allwidgets, function (value) {
                    var el = {'name': value.name};

                    $scope.allAvaiableWidgets.push(el);
                });
            };

            $scope.getwidgets();

            //$rootScope.$broadcast('inputTextUpdated', {data:  $scope.allAvaiableWidgets[0].name, elementid:'widgetlist'});

            $scope.$watch(
                'inputText',
                function( newValue, oldValue ) {
                    //$scope.allProgramnamesselectedOption = newValue;
                    if(!!newValue) {
                        $rootScope.$broadcast('inputTextUpdated', {data: newValue.name, elementid: 'widgetlist'});
                    }
                });

    }]).controller('AdminWidgetListController',
    [   '$location','$rootScope',
        '$scope','Global','$http',
        'formtoaster','Restangular',
        'ItemData', 'PrivilegeURLItem',
        '$builder','AllWidgetData',
        'CreateWidget',
        function($location,$rootScope,$scope,
                 Global,$http,
                 formtoaster,Restangular,
                 ItemData,PrivilegeURLItem,
                 $builder,AllWidgetData,
                 CreateWidget) {

            $scope.global = Global;

            $scope.package = {
                name: 'admin'
            };

            $scope.pop = function(){
                formtoaster.now.success('Your widget was just updated.');
            };

            $scope.pop_removed = function(){
                formtoaster.now.warning('Your widget was just removed.');
            };

            var widgets = Restangular.all('widget');

            var refresh = function(data){
                if(data.length > 0){
                    /*$scope.$on('$stateChangeSuccess', function () {
                     $timeout(function () {
                     $state.go($state.current, {}, {reload: true});
                     }, 100);
                     });*/
                    $timeout(function () {
                        $window.location.reload();
                    }, 100);

                }

            };

            CreateWidget.getwidgets();

            $scope.updatewidgets = function(){
                $scope.allWidgets  = [];
                CreateWidget.getwidgets();
            };

            $rootScope.$on('needtoupdateformlist', function(event, args) {
                CreateWidget.getwidgets();
            });

            $rootScope.$on('needtoclearformlist', function(event, args) {
                $scope.allWidgets  = [];
            });

            $rootScope.$on('widgetdataready', function(event, args) {
                if(args.data.length>=0)
                {
                    $scope.allWidgets  = args.data;
                }
            });


            //$timeout( $scope.getforms(), 30);

            $scope.removeWidget = function(widget){

                var widget = Restangular.one("widget", widget.id);
                widget.remove();

                var index = 0;
                _.each($scope.allWidgets,function(value) {
                    if (value.id === widget.id) {
                        $scope.allWidgets.splice(index, 1);
                    }
                    index = index + 1;
                });

                $scope.pop_removed();
            };

     }]).
     controller('EditWidgetController', [
        '$rootScope','$scope', '$builder', '$validator', 'CreateWidget',
        '$location','formtoaster','Restangular','JSTagsCollection','ItemData',
        function($rootScope, $scope, $builder,
                 $validator,CreateWidget,$location,
                 formtoaster,Restangular,JSTagsCollection,
                 ItemData) {

            var eventupate;

            $scope.pop = function(){
                formtoaster.now.success('Your widget was just updated.');
            };


            $scope.pop_error = function(){
                formtoaster.now.error('There are errors in your submission. Likely you have forgot to fill out all required fields' +
                ' You have to fix them before you can submit.');
            };

            $scope.tree_data =  ItemData.item_privilege;

            $rootScope.$on('jsTags', function(event, args) {
                if(!!args.value)
                {
                    $scope.tagarray = [];
                    _.each(args.value.tags, function(value,key) {
                        $scope.tagarray.push(value.value);
                    });

                }
            });

            $rootScope.$on('adminwidgetroledataupdated', function(event, args) {
                if(args.data.length>=0)
                {
                    $scope.widgetroles = args.data;
                }
            });

            var widgets = Restangular.all('widget');

            $builder.removeAllObjects('widgetbuiltinforms');

            $builder.removeAllObjects('editwidgetform');

            CreateWidget.builtinwidgets();

            $scope.addWidgetObject = function(widget){
                for (var j = 0; j < widget.widgetformbuilder.length; j++) {

                    $builder.addFormObject('editwidgetform', widget.widgetformbuilder[j]);
                }
            };

            $scope.widgetinformation = CreateWidget.builtinwidgetinformation;

            $scope.widgetid = $location.path().split('/')[3];

            widgets.getList().then(function(widgets) {
                _.each(widgets,function(value) {
                    if(value._id ===  $scope.widgetid) {
                        $scope.widgetroles = value.widgetroles;
                        $rootScope.$emit('adminwidgetrolefetched', {
                            data:  value.widgetroles
                        });
                        console.log(value.widgetformbuilder);
                        $scope.tree_data =  value.formroles;
                        $scope.addWidgetObject(value);
                        $scope.widgetbuiltinvalue = {};
                        $scope.widgetbuiltinvalue[value.widgetbasicinformation[0].id] = value.widgetbasicinformation[0].value;
                        $scope.widgetbuiltinvalue[value.widgetbasicinformation[1].id] = value.widgetbasicinformation[1].value;
                        $scope.widgetbuiltinvalue[value.widgetbasicinformation[2].id] = value.widgetbasicinformation[2].value;
                        $rootScope.$emit('programTextNeedUpdate', {
                            data: $scope.widgetinformation.formprogram(value.widgetbasicinformation)
                        });
                    }});
            });

            //$scope.form = $builder.forms['builtinforms'];

            $scope.form = $builder.forms['widgetbuiltinforms'];
            $scope.editwidgetformdata = $builder.forms['editwidgetform'];
            $scope.input = [];
            $scope.defaultValue = {};


            $scope.updatewidget = function(){
                //console.log('USERID: ' + $scope.global.user._id);
                return $validator.validate($scope, 'widgetbuiltinforms').success(function() {
                    Restangular.one('widget/' + $scope.widgetid).get().then(function(widget) {
                        widget.widgetbasicinformation = $scope.input;
                        widget.widgetformbuilder = $scope.editwidgetformdata;
                        widget.widgetcreator = $scope.global.user._id;
                        widget.widgetroles = $scope.widgetroles;
                        widget.save();
                    });
                    $scope.pop();
                }).error(function() {
                    $scope.pop_error();
                });
            };

            $scope.roletags = [];
            return $scope.submit = function() {
                $scope.updatewidget();
            };

    }]);









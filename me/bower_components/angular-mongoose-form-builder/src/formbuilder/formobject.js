/*

   formobject

 */

(function() {
    var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

    angular.module('formobject.provider', ['external_formobjects.provider']).provider('$formobject', function() {
        var $http, $injector, $templateCache, $navtree, $rootScope,$external_formobjects;
        $injector = null;
        $http = null;
        $templateCache = null;
        $navtree = null;
        $rootScope = null;
        $external_formobjects = null;

        this.general_external_formobjects = (function(_this) {
            return function(scope) {

                $external_formobjects.execute_scope_functions(scope);

            };
        })(this);


       this.checkbox_get_values = (function(_this) {
            return function(scope) {
                  if (scope.$component.arrayToText) { //for checkbox only

                        _.map(scope.formObject.options,function(item){
                            if(!scope.inputArray_CheckBox_value_assigned){
                             scope.inputArray_CheckBox = [];
                             scope.checked = [];
                             scope.inputArray_CheckBox.push(false);
                             scope.checked.push(false);
                             //console.log('add fasle here');
                            }
                        });

                        scope.$watch('inputArray_CheckBox', function(newValue, oldValue) {
                            //console.log(newValue);
                            var index, _ref;
                            if (newValue === oldValue) {
                                return;
                            }

                            for (index in scope.inputArray_CheckBox) {
                                if (scope.inputArray_CheckBox[index]) {
                                     //checked.push((_ref = scope.options[index]) != null ? _ref : scope.inputArray[index]);
                                     //scope.checked.push(scope.inputArray_CheckBox[index]);
                                     scope.checked[index] = true;

                                }
                            }

                            scope.inputText = scope.checked.join(',');

                            return scope.inputText

                        }, true);
               }
            };
        })(this);

        this.set_values = (function(_this) {
            return function(scope) {
               scope.$watch("default['" + scope.formObject.id + "']", function(value) {

                        if (!value) {
                            return;
                        }
                        if (scope.$component.arrayToText) {
                            value = value.split(',');
                            value_boolean = [];
                            _.map(value,function(item){
                                value_boolean.push(item === 'true');
                            });
                            scope.inputArray_CheckBox =  value_boolean;
                            scope.inputArray_CheckBox_value_assigned = true;
                            //console.log(value);
                            //console.log(scope.inputArray_CheckBox);

                            return scope.inputArray = value;
                        } else {
                            return scope.inputText = value;
                        }
                    });
              };
        })(this);


        this.setupProviders = (function(_this) {
            return function(injector) {
                $injector = injector;
                $http = $injector.get('$http');
                $navtree = $injector.get('$navtree');
                $rootScope = $injector.get('$rootScope');
                $external_formobjects = $injector.get('$external_formobjects');
                return $templateCache = $injector.get('$templateCache');
            };
        })(this);

        this.$get = [
            '$injector',(function(_this) {
                return function($injector,navtreefactory) {
                    _this.setupProviders($injector);
                    return {
                         checkbox_get_values: _this.checkbox_get_values,
                         set_values:_this.set_values,
                         general_external_formobjects:_this.general_external_formobjects
                    };
                };
            })(this)
        ];
    });

}).call(this);

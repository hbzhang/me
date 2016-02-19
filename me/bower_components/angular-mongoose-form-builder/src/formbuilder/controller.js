(function() {
    var copyObjectToScope;

    copyObjectToScope = function(object, scope) {

        /*
         Copy object (ng-repeat="object in objects") to scope without `hashKey`.
         */
        var key, value;
        for (key in object) {
            value = object[key];
            if (key !== '$$hashKey') {
                scope[key] = value;
            }
        }
    };

    angular.module('builder.controller', ['builder.provider','service.tree']).controller('fbFormObjectEditableController', [
        '$scope', '$injector', function($scope, $injector) {
            var $builder;
            $builder = $injector.get('$builder');
            $scope.setupScope = function(formObject) {

                /*
                 1. Copy origin formObject (ng-repeat="object in formObjects") to scope.
                 2. Setup optionsText with formObject.options.
                 3. Watch scope.label, .description, .placeholder, .required, .options then copy to origin formObject.
                 4. Watch scope.optionsText then convert to scope.options.
                 5. setup validationOptions
                 */
                var component;
                copyObjectToScope(formObject, $scope);
                $scope.optionsText = formObject.options.join('\n');
                $scope.$watch('[label, description, placeholder, required, options, validation]', function() {
                    formObject.label = $scope.label;
                    formObject.description = $scope.description;
                    formObject.placeholder = $scope.placeholder;
                    formObject.required = $scope.required;
                    formObject.options = $scope.options;
                    return formObject.validation = $scope.validation;
                }, true);
                $scope.$watch('optionsText', function(text) {
                    var x;
                    $scope.options = (function() {
                        var _i, _len, _ref, _results;
                        _ref = text.split('\n');
                        _results = [];
                        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                            x = _ref[_i];
                            if (x.length > 0) {
                                _results.push(x);
                            }
                        }
                        return _results;
                    })();
                    return $scope.inputText = $scope.options[0];
                });
                component = $builder.components[formObject.component];
                return $scope.validationOptions = component.validationOptions;
            };
            return $scope.data = {
                model: null,
                backup: function() {

                    /*
                     Backup input value.
                     */
                    return this.model = {
                        label: $scope.label,
                        description: $scope.description,
                        placeholder: $scope.placeholder,
                        required: $scope.required,
                        optionsText: $scope.optionsText,
                        validation: $scope.validation
                    };
                },
                rollback: function() {

                    /*
                     Rollback input value.
                     */
                    if (!this.model) {
                        return;
                    }
                    $scope.label = this.model.label;
                    $scope.description = this.model.description;
                    $scope.placeholder = this.model.placeholder;
                    $scope.required = this.model.required;
                    $scope.optionsText = this.model.optionsText;
                    return $scope.validation = this.model.validation;
                }
            };
        }
    ]).controller('fbComponentsController', [
        '$scope', '$injector', function($scope, $injector) {
            var $builder;
            $builder = $injector.get('$builder');
            $navtree = $injector.get('$navtree');
            $http = $injector.get('$http');
            $templateCache =  $injector.get('$templateCache');
            $timeout =  $injector.get('$timeout');

            $scope.all_templates_from_URL = [];

            $scope.selectGroup = function($event, group) {
                var component, name, _ref, _results;
                if ($event != null) {
                    $event.preventDefault();
                }
                $scope.activeGroup = group;
                $scope.components = [];
                _ref = $builder.components;
                _results = [];
                for (name in _ref) {
                    component = _ref[name];
                    if (component.group === group) {
                        _results.push($scope.components.push(component));
                    }
                }
                return _results;
            };
            $scope.child_array_accordin = function($event, group) {
                  if ($event != null) {
                    $event.preventDefault();
                  }
              
                  $scope.accordintitles = [];
                  _.map(group.child,function(value,key){
                        $scope.accordintitles.push(key);
                  });
                  return $scope.accordintitles ;

            };

          $scope.Template_from_URL = function(component) {

            if (!!component.templateUrl || !!component.popoverTemplateUrl) {
              var already_added = false; 
              _.map($scope.all_templates_from_URL, function(item){

                if(item.uniqueid === component.uniqueid)
                  already_added = true;
              });
              if(!already_added){
                 component.URL_data_fetched = false;
                 $scope.all_templates_from_URL.push(component);
              }
            
            }

          };


         $scope.loadTemplate_in_async_way  = function() {

            if(!!$scope.all_templates_from_URL && $scope.all_templates_from_URL.length >0) {
             async.map($scope.all_templates_from_URL,
             function(component, callback) {
              if(!component.URL_data_fetched) {
                 $scope.loadTemplate(component);
                 component.URL_data_fetched = true;
              }
            
             }, function(err, results){
               //console.log(results);
             });

            }
        

         }

         $scope.loadTemplate = function(component) {
            //console.log(component);
            if (component.template == null) {
                $http.get(component.templateUrl, {
                    cache: $templateCache
                }).success(function(template) {
                    console.log("The template is being loaded from URL.");
                    // console.log(template);
                    return component.template = template;
                });
            }
            if (component.popoverTemplate == null) {
                return $http.get(component.popoverTemplateUrl, {
                    cache: $templateCache
                }).success(function(template) {
                    return component.popoverTemplate = template;
                });
            }
         };

         $scope.child_array_components = function($event, group,accordintitle) {
                  if ($event != null) {
                    $event.preventDefault();
                  }
                  $scope.components = []; 

                  _.map(group.child,function(value,key){

                      if(accordintitle === key)
                      _.map(value,function(item){

                         if(!(item instanceof Array)){
                          //$timeout(function() {}, 3000);
                          $scope.Template_from_URL(item.component);

                          $scope.components.push(item.component);
                         }
                            

                       });
                  });


                  if(!$scope.child_array_components_executed) {
                    //console.log($scope.all_templates_from_URL);
                  }

                  $scope.loadTemplate_in_async_way();

                  return $scope.components;
            };


            $scope.child_array_tab_components = function($event, group,accordintitle,tab) {
                  if ($event != null) {
                    $event.preventDefault();
                  }

               
                  $scope.tab_components = [];

                  _.map(group.child,function(value,key){

                      if(accordintitle === key)
                      _.map(value,function(item){

                         if(item instanceof Array){
                            if(tab[0].group === item[0].group) {
                            _.map(item,function(itemvalue){
                            //  $timeout(function() {}, 3000);
                            $scope.Template_from_URL(itemvalue.component);
                            $scope.tab_components.push(itemvalue.component);
                           });
                           }
                         }

                       });
                  });

                  if(!$scope.child_array_tab_components_executed) {
                    //console.log($scope.all_templates_from_URL);
                    
                  }

                  $scope.loadTemplate_in_async_way();
                  return $scope.tab_components;
            };

            $scope.child_array_tabs = function($event, group,accordintitle) {

                 if ($event != null) {
                    $event.preventDefault();
                  }
                  $scope.within_accordin_tabs = [];
                  _.map(group.child,function(value,key){

                      if(accordintitle === key)
                      _.map(value,function(item){

                         if(item instanceof Array)
                           $scope.within_accordin_tabs = value;

                       });
                  });
                  return  $scope.within_accordin_tabs;

            };


             

             $scope.according_item_is_tabs = function($event, group,accordintitle) {

                 if ($event != null) {
                    $event.preventDefault();
                  }

                  var is_tabs = false; 

                   _.map(group.child,function(value,key){

                      if(accordintitle === key)
                      _.map(value,function(item){

                         if(item instanceof Array)
                             is_tabs = true;
                      
                       });
                  });

                   return is_tabs;
             };


            $scope.groups = $builder.groups;
            $scope.nav_tree_array =  $navtree.get_nav_tree_array();
            //console.log($scope.nav_tree_array);
            $scope.oneAtATime = true;
            $scope.status = {
                isFirstOpen: true,
                isFirstDisabled: false
           };
            $scope.activeGroup = $scope.groups[0];
            $scope.allComponents = $builder.components;
            return $scope.$watch('allComponents', function() {
                return $scope.selectGroup(null, $scope.activeGroup);
            });
        }
    ]).controller('fbComponentController', [
        '$scope', function($scope) {
            return $scope.copyObjectToScope = function(object) {
                return copyObjectToScope(object, $scope);
            };
        }
    ]).controller('fbFormController', [
        '$scope', '$injector', function($scope, $injector) {
            var $builder, $timeout;
            $builder = $injector.get('$builder');
            $timeout = $injector.get('$timeout');
            if ($scope.input == null) {
                $scope.input = [];
            }
             
            return $scope.$watch('form', function() {
                if ($scope.input.length > $scope.form.length) {
                    $scope.input.splice($scope.form.length);
                }
                return $timeout(function() {
                    return $scope.$broadcast($builder.broadcastChannel.updateInput);
                });
            }, true);
        }
    ]).controller('fbFormObjectController', [
        '$scope', '$injector','$rootScope', function($scope, $injector,$rootScope) {
            var $builder;
            $builder = $injector.get('$builder');
            $scope.copyObjectToScope = function(object) {
                return copyObjectToScope(object, $scope);
            };
            

            return $scope.updateInput = function(value) {

                /*
                 Copy current scope.input[X] to $parent.input.
                 @param value: The input value.
                 */
                var input;
                input = {
                    id: $scope.formObject.id,
                    label: $scope.formObject.label,
                    value: value != null ? value : '',
                    data: $scope.formObject.nav_tree[0].data
                };
                return $scope.$parent.input.splice($scope.$index, 1, input);
            };
        }
    ]);

}).call(this);

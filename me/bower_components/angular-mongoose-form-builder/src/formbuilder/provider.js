/*
 component:
 It is like a class.
 The base components are textInput, textArea, select, check, radio.
 User can custom the form with components.
 formObject:
 It is like an object (an instance of the component).
 User can custom the label, description, required and validation of the input.
 form:
 This is for end-user. There are form groups int the form.
 They can input the value to the form.
 */

 //http://stackoverflow.com/questions/19719729/angularjs-injecting-factory-from-another-module-into-a-provider

(function() {
    var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

    angular.module('builder.provider', ['service.tree','navtreeModule']).provider('$builder', function() {
        var $http, $injector, $templateCache, $navtree, $rootScope;
        $injector = null;
        $http = null;
        $templateCache = null;
        $navtree = null;
        $rootScope = null;
        this.config = {
            popoverPlacement: 'right'
        };
        this.nav_tree_array = [];
        this.components = {};
        this.groups = [];
        this.broadcastChannel = {
            updateInput: '$updateInput'
        };
        this.forms = {
            "default": []
        };
        this.convertComponent = function(name, component) {
            var _result, result, _ref00, _ref0, _ref, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8, _ref9;
              
            _result = {
                name: name,
                uniqueid: (_ref00 = component.nav_tree[0].uniqueid) != null ? _ref00 : 'Default',
                group: (_ref = component.group) != null ? _ref : 'Default',
                label: (_ref1 = component.label) != null ? _ref1 : '',
                description: (_ref2 = component.description) != null ? _ref2 : '',
                placeholder: (_ref3 = component.placeholder) != null ? _ref3 : '',
                editable: (_ref4 = component.editable) != null ? _ref4 : true,
                required: (_ref5 = component.required) != null ? _ref5 : false,
                validation: (_ref6 = component.validation) != null ? _ref6 : '/.*/',
                validationOptions: (_ref7 = component.validationOptions) != null ? _ref7 : [],
                options: (_ref8 = component.options) != null ? _ref8 : [],
                arrayToText: (_ref9 = component.arrayToText) != null ? _ref9 : false,
                template: component.template,
                templateUrl: component.templateUrl,
                popoverTemplate: component.popoverTemplate,
                popoverTemplateUrl: component.popoverTemplateUrl
            };

            result = {
                nav_tree: (_ref0 = component.nav_tree) != null ? _ref0 : [],
                component:_result
            };

            result = _.extend(result, _result);

            if (!result.template && !result.templateUrl) {
                console.error("The template is empty.");
            }
            if (!result.popoverTemplate && !result.popoverTemplateUrl) {
                console.error("The popoverTemplate is empty.");
            }
            return result;
        };
        this.convertFormObject = function(name, formObject) {
            var component, result, _ref0, _ref, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7;
            if (formObject == null) {
                formObject = {};
            }
            component = this.components[formObject.component];
            if (component == null) {
                throw "The component " + formObject.component + " was not registered.";
            }
            result = {
                id: formObject.id,
                nav_tree: (_ref0 = formObject.nav_tree) != null ? _ref0 : component.nav_tree,
                component: formObject.component,
                editable: (_ref = formObject.editable) != null ? _ref : component.editable,
                index: (_ref1 = formObject.index) != null ? _ref1 : 0,
                label: (_ref2 = formObject.label) != null ? _ref2 : component.label,
                description: (_ref3 = formObject.description) != null ? _ref3 : component.description,
                placeholder: (_ref4 = formObject.placeholder) != null ? _ref4 : component.placeholder,
                options: (_ref5 = formObject.options) != null ? _ref5 : component.options,
                required: (_ref6 = formObject.required) != null ? _ref6 : component.required,
                validation: (_ref7 = formObject.validation) != null ? _ref7 : component.validation
            };
            return result;
        };
        this.reindexFormObject = (function(_this) {
            return function(name) {
                var formObjects, index, _i, _ref;
                formObjects = _this.forms[name];
                for (index = _i = 0, _ref = formObjects.length; _i < _ref; index = _i += 1) {
                    formObjects[index].index = index;
                }
            };
        })(this);
        this.setupProviders = (function(_this) {
            return function(injector) {
                $injector = injector;
                $http = $injector.get('$http');
                $navtree = $injector.get('$navtree');
                $rootScope = $injector.get('$rootScope');
                return $templateCache = $injector.get('$templateCache');
            };
        })(this);

         this.setupNavtree = (function(_this) {
            return function() {
                //$navtree.nav_tree_build(_this.nav_tree_array);                
            };
        })(this);


          //$navtreeprovider.nav_tree_build(navtree);


        this.loadTemplate = function(component) {

            /*
             Load template for components.
             @param component: {object} The component of $builder.
             */
            if (component.template == null) {
                $http.get(component.templateUrl, {
                    cache: $templateCache
                }).success(function(template) {
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

        this.nav_tree_build_start = (function(_this) {

               return function(newComponent) {
                  _this.nav_tree_array.push(newComponent);

                    if ($injector != null){ 
                       $navtree.nav_tree_build(_this.nav_tree_array);   
                    }
              };
        })(this);


        this.registerComponent = (function(_this) {
            return function(name, component) {
                var newComponent, _ref;

               //var injector = angular.injector(['service.tree']);
               //var navtreeprovider = injector.get('$navtree');


                if (component == null) {
                    component = {};
                }

                /*
                 Register the component for form-builder.
                 @param name: The component name.
                 @param component: The component object.
                 group: {string} The component group.
                 label: {string} The label of the input.
                 description: {string} The description of the input.
                 placeholder: {string} The placeholder of the input.
                 editable: {bool} Is the form object editable?
                 required: {bool} Is the form object required?
                 validation: {string} angular-validator. "/regex/" or "[rule1, rule2]". (default is RegExp(.*))
                 validationOptions: {array} [{rule: angular-validator, label: 'option label'}] the options for the validation. (default is [])
                 options: {array} The input options.
                 arrayToText: {bool} checkbox could use this to convert input (default is no)
                 template: {string} html template
                 templateUrl: {string} The url of the template.
                 popoverTemplate: {string} html template
                 popoverTemplateUrl: {string} The url of the popover template.
                 */
                if (_this.components[name] == null) {
                    newComponent = _this.convertComponent(name, component);

                    _this.components[name] = newComponent;
                    
                    /*var _navtree = navtree[0];
                    _navtree.data = [];

                    _navtree.componentname = name;
                    _navtree.data.push(newComponent)
                    */
                    if ($injector != null) 
                        _this.loadTemplate(newComponent);
                    }

                    _this.nav_tree_build_start(newComponent);

                    if (_ref = newComponent.group, __indexOf.call(_this.groups, _ref) < 0) {
                        _this.groups.push(newComponent.group);
                    }
                    else {
                        //console.log("The component " + name + " was registered.");
                }
            };
        })(this);
        this.addFormObject = (function(_this) {
            return function(name, formObject) {
                var _base;
                if (formObject == null) {
                    formObject = {};
                }

                /*
                 Insert the form object into the form at last.
                 */
                if ((_base = _this.forms)[name] == null) {
                    _base[name] = [];
                }
                return _this.insertFormObject(name, _this.forms[name].length, formObject);
            };
        })(this);
        this.insertFormObject = (function(_this) {
            return function(name, index, formObject) {
                var _base;
                if (formObject == null) {
                    formObject = {};
                }

                /*
                 Insert the form object into the form at {index}.
                 @param name: The form name.
                 @param index: The form object index.
                 @param form: The form object.
                 id: The form object id.
                 component: {string} The component name
                 editable: {bool} Is the form object editable? (default is yes)
                 label: {string} The form object label.
                 description: {string} The form object description.
                 placeholder: {string} The form object placeholder.
                 options: {array} The form object options.
                 required: {bool} Is the form object required? (default is no)
                 validation: {string} angular-validator. "/regex/" or "[rule1, rule2]".
                 [index]: {int} The form object index. It will be updated by $builder.
                 @return: The form object.
                 */
                if ((_base = _this.forms)[name] == null) {
                    _base[name] = [];
                }
                if (index > _this.forms[name].length) {
                    index = _this.forms[name].length;
                } else if (index < 0) {
                    index = 0;
                }
                _this.forms[name].splice(index, 0, _this.convertFormObject(name, formObject));
                _this.reindexFormObject(name);
                return _this.forms[name][index];
            };
        })(this);
        this.removeFormObject = (function(_this) {
            return function(name, index) {

                /*
                 Remove the form object by the index.
                 @param name: The form name.
                 @param index: The form object index.
                 */
                var formObjects;
                formObjects = _this.forms[name];
                formObjects.splice(index, 1);
                return _this.reindexFormObject(name);
            };
        })(this);

        this.removeAllObjects = (function(_this) {
            return function(name) {
                /*
                 Remove the form object by the index.
                 @param name: The form name.
                 @param index: The form object index.
                 */
                _this.forms[name] = [];
            };
        })(this);

        this.updateFormObjectIndex = (function(_this) {
            return function(name, oldIndex, newIndex) {

                /*
                 Update the index of the form object.
                 @param name: The form name.
                 @param oldIndex: The old index.
                 @param newIndex: The new index.
                 */
                var formObject, formObjects;
                if (oldIndex === newIndex) {
                    return;
                }
                formObjects = _this.forms[name];
                formObject = formObjects.splice(oldIndex, 1)[0];
                formObjects.splice(newIndex, 0, formObject);
                return _this.reindexFormObject(name);
            };
        })(this);
        this.$get = [
            '$injector', 'navtreefactory',(function(_this) {
                return function($injector,navtreefactory) {
                    //navtreefactory.nav_tree_build('asdasd');
                    var component, name, _ref;
                    _this.setupProviders($injector);
                    _this.setupNavtree();
                    _ref = _this.components;
                    for (name in _ref) {
                        component = _ref[name];
                        _this.loadTemplate(component);
                    }
                    return {
                        config: _this.config,
                        components: _this.components,
                        groups: _this.groups,
                        forms: _this.forms,
                        broadcastChannel: _this.broadcastChannel,
                        registerComponent: _this.registerComponent,
                        addFormObject: _this.addFormObject,
                        insertFormObject: _this.insertFormObject,
                        removeFormObject: _this.removeFormObject,
                        removeAllObjects:_this.removeAllObjects,
                        updateFormObjectIndex: _this.updateFormObjectIndex
                    };
                };
            })(this)
        ];
    });

}).call(this);

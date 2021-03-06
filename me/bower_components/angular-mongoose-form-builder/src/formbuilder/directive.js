
(function() {
    angular.module('builder.directive',
        [
        'componentshtmltemplate.templates',
        'formobject.provider','builder.provider',
        'builder.controller', 'builder.drag',
        'validator','ui.bootstrap'
        ]).directive('fbBuilder', [
        '$injector', function($injector) {
            var $builder, $drag;
            $builder = $injector.get('$builder');
            $drag = $injector.get('$drag');
            return {
                restrict: 'A',
                scope: {
                    fbBuilder: '='
                },
                template: "<div class='form-horizontal'>\n    <div class='fb-form-object-editable' ng-repeat=\"object in formObjects\"\n        fb-form-object-editable=\"object\"></div>\n</div>",
                link: function(scope, element, attrs) {
                    var beginMove, _base, _name;
                    scope.formName = attrs.fbBuilder;
                    if ((_base = $builder.forms)[_name = scope.formName] == null) {
                        _base[_name] = [];
                    }
                    scope.formObjects = $builder.forms[scope.formName];
                    beginMove = true;
                    $(element).addClass('fb-builder');
                    return $drag.droppable($(element), {
                        move: function(e) {
                            var $empty, $formObject, $formObjects, height, index, offset, positions, _i, _j, _ref, _ref1;
                            if (beginMove) {
                                $("div.fb-form-object-editable").popover('hide');
                                beginMove = false;
                            }
                            $formObjects = $(element).find('.fb-form-object-editable:not(.empty,.dragging)');
                            if ($formObjects.length === 0) {
                                if ($(element).find('.fb-form-object-editable.empty').length === 0) {
                                    $(element).find('>div:first').append($("<div class='fb-form-object-editable empty'></div>"));
                                }
                                return;
                            }
                            positions = [];
                            positions.push(-1000);
                            for (index = _i = 0, _ref = $formObjects.length; _i < _ref; index = _i += 1) {
                                $formObject = $($formObjects[index]);
                                offset = $formObject.offset();
                                height = $formObject.height();
                                positions.push(offset.top + height / 2);
                            }
                             positions.push(positions[positions.length - 1] + 1000);


                            for (index = _j = 1, _ref1 = positions.length; _j < _ref1; index = _j += 1) {
                                if (e.pageY > positions[index - 1] && e.pageY <= positions[index]) {
                                    $(element).find('.empty').remove();
                                    $empty = $("<div class='fb-form-object-editable empty'></div>");
                                    if (index - 1 < $formObjects.length) {
                                        $empty.insertBefore($($formObjects[index - 1]));
                                    } else {
                                        $empty.insertAfter($($formObjects[index - 2]));
                                    }
                                    break;
                                }
                            }
                        },
                        out: function() {
                            if (beginMove) {
                                $("div.fb-form-object-editable").popover('hide');
                                beginMove = false;
                            }



                            return $(element).find('.empty').remove();
                        },
                        up: function(e, isHover, draggable) {
                            var formObject, newIndex, oldIndex;
                            beginMove = true;

                            if (!$drag.isMouseMoved()) {
                                $(element).find('.empty').remove();
                                return;
                            }
                            if (!isHover && draggable.mode === 'drag') {
                                formObject = draggable.object.formObject;
                               /* if (formObject.editable) {  This can cause the object got deleted accidentenly
                                    $builder.removeFormObject(attrs.fbBuilder, formObject.index);
                                }*/
                            } else if (isHover) {
                                if (draggable.mode === 'mirror') {
                                    $builder.insertFormObject(scope.formName, $(element).find('.empty').index('.fb-form-object-editable'), {
                                        component: draggable.object.componentName
                                    });
                                }
                                if (draggable.mode === 'drag') {
                                    oldIndex = draggable.object.formObject.index;
                                    newIndex = $(element).find('.empty').index('.fb-form-object-editable');
                                    if (oldIndex < newIndex) {
                                        newIndex--;
                                    }
                                    $builder.updateFormObjectIndex(scope.formName, oldIndex, newIndex);
                                }
                            }
                            return $(element).find('.empty').remove();
                        }
                    });
                }
            };
        }
    ]).directive('fbFormObjectEditable', [
        '$injector', function($injector) {
            var $builder, $compile, $drag, $validator;
            $builder = $injector.get('$builder');
            $drag = $injector.get('$drag');
            $compile = $injector.get('$compile');
            $validator = $injector.get('$validator');
            $formobject = $injector.get('$formobject');
            return {
                restrict: 'A',
                controller: 'fbFormObjectEditableController',
                scope: {
                    formObject: '=fbFormObjectEditable'
                },
                link: function(scope, element) {
                    var popover;
                    scope.inputArray = [];
                    scope.$component = $builder.components[scope.formObject.component];
                    scope.setupScope(scope.formObject);
                    $formobject.general_external_formobjects(scope);
                    scope.$watch('$component.template', function(template) {
                        var view;
                        if (!template) {
                            return;
                        }
                        view = $compile(template)(scope);
                        return $(element).html(view);
                    });
                    $(element).on('click', function() {
                        return false;
                    });
                    $drag.draggable($(element), {
                        object: {
                            formObject: scope.formObject
                        }
                    });
                    if (!scope.formObject.editable) {
                        return;
                    }
                    popover = {};
                    scope.$watch('$component.popoverTemplate', function(template) {
                        if (!template) {
                            return;
                        }
                        $(element).removeClass(popover.id);
                        popover = {
                            id: "fb-" + (Math.random().toString().substr(2)),
                            isClickedSave: false,
                            view: null,
                            html: template
                        };
                        popover.html = $(popover.html).addClass(popover.id);
                        popover.view = $compile(popover.html)(scope);
                        $(element).addClass(popover.id);
                        return $(element).popover({
                            html: true,
                            title: scope.$component.label,
                            content: popover.view,
                            container: 'body',
                            placement: $builder.config.popoverPlacement
                        });
                    });
                    scope.popover = {
                        save: function($event) {

                            /*
                             The save event of the popover.
                             */
                            $event.preventDefault();
                            $validator.validate(scope).success(function() {
                                popover.isClickedSave = true;
                                return $(element).popover('hide');
                            });
                        },
                        remove: function($event) {

                            /*
                             The delete event of the popover.
                             */
                            $event.preventDefault();
                            $builder.removeFormObject(scope.$parent.formName, scope.$parent.$index);
                            $(element).popover('hide');
                        },
                        shown: function() {

                            /*
                             The shown event of the popover.
                             */
                            scope.data.backup();
                            return popover.isClickedSave = false;
                        },
                        cancel: function($event) {

                            /*
                             The cancel event of the popover.
                             */
                            scope.data.rollback();
                            if ($event) {
                                $event.preventDefault();
                                $(element).popover('hide');
                            }
                        }
                    };
                    $(element).on('show.bs.popover', function() {
                        var $popover, elementOrigin, popoverTop;
                        if ($drag.isMouseMoved()) {
                            return false;
                        }
                        $("div.fb-form-object-editable:not(." + popover.id + ")").popover('hide');
                        $popover = $("form." + popover.id).closest('.popover');
                        if ($popover.length > 0) {
                            elementOrigin = $(element).offset().top + $(element).height() / 2;
                            popoverTop = elementOrigin - $popover.height() / 2;
                            $popover.css({
                                position: 'absolute',
                                top: popoverTop
                            });
                            $popover.show();
                            setTimeout(function() {
                                $popover.addClass('in');
                                return $(element).triggerHandler('shown.bs.popover');
                            }, 0);
                            return false;
                        }
                    });
                    $(element).on('shown.bs.popover', function() {
                        $(".popover ." + popover.id + " input:first").select();
                        scope.$apply(function() {
                            return scope.popover.shown();
                        });
                    });
                    return $(element).on('hide.bs.popover', function() {
                        var $popover;
                        $popover = $("form." + popover.id).closest('.popover');
                        if (!popover.isClickedSave) {
                            if (scope.$$phase || scope.$root.$$phase) {
                                scope.popover.cancel();
                            } else {
                                scope.$apply(function() {
                                    return scope.popover.cancel();
                                });
                            }
                        }
                        $popover.removeClass('in');
                        setTimeout(function() {
                            return $popover.hide();
                        }, 300);
                        return false;
                    });
                }
            };
        }
    ]).directive('fbComponents', function() {
        return {
            restrict: 'A',
            templateUrl: 'templates/htmls/fbcomponents.html',
            //template: "<ul ng-if=\"groups.length > 1\" class=\"nav nav-tabs nav-justified\">\n    <li ng-repeat=\"group in groups\" ng-class=\"{active:activeGroup==group}\">\n        <a href='#' ng-click=\"selectGroup($event, group)\">{{group}}</a>\n    </li>\n</ul>\n<div class='form-horizontal'>\n <accordion close-others=\"oneAtATime\">\n  <accordion-group heading=\"Form Elements Group 1\" is-open=\"status.isFirstOpen\" >\n  <div class='fb-component' ng-repeat=\"component in components\"\n        fb-component=\"component\"></div>\n    </accordion-group>\n    </accordion>\n </div>",
            controller: 'fbComponentsController'
        };
    }).directive('fbComponent', [
        '$injector', function($injector) {
            var $builder, $compile, $drag;
            $builder = $injector.get('$builder');
            $drag = $injector.get('$drag');
            $compile = $injector.get('$compile');
            $formobject = $injector.get('$formobject');

            return {
                restrict: 'A',
                scope: {
                    component: '=fbComponent'
                },
                controller: 'fbComponentController',
                link: function(scope, element) {
                    scope.copyObjectToScope(scope.component);
                    $formobject.general_external_formobjects(scope);
                    $drag.draggable($(element), {
                        mode: 'mirror',
                        defer: false,
                        object: {
                            componentName: scope.component.name
                        }
                    });
                    return scope.$watch('component.template', function(template) {
                        var view;
                        if (!template) {
                            return;
                        }
                        view = $compile(template)(scope);
                        return $(element).html(view);
                    });
                }
            };
        }
    ]).directive('fbForm', [
        '$injector', function($injector) {
            return {
                restrict: 'A',
                require: 'ngModel',
                scope: {
                    data: '@fbData',
                    formName: '@fbForm',
                    input: '=ngModel',
                    "default": '=fbDefault'
                },
                template: "<div class='fb-form-object' ng-repeat=\"object in form\" fb-form-object=\"object\"></div>",
                controller: 'fbFormController',
                link: function(scope, element, attrs) {
                    var $builder, _base, _name;
                    $builder = $injector.get('$builder');
                    if ((_base = $builder.forms)[_name = scope.formName] == null) {
                        _base[_name] = [];
                    }

                    return scope.form = $builder.forms[scope.formName];
                }
            };
        }
    ]).directive('fbFormObject', [
        '$injector', '$rootScope', function($injector,$rootScope) {
            var $builder, $compile, $parse;
            $builder = $injector.get('$builder');
            $compile = $injector.get('$compile');
            $parse = $injector.get('$parse');
            $formobject = $injector.get('$formobject');

            return {
                restrict: 'A',
                controller: 'fbFormObjectController',
                link: function(scope, element, attrs) {
                    scope.formObject = $parse(attrs.fbFormObject)(scope);
                    scope.$component = $builder.components[scope.formObject.component];
                    scope.$on($builder.broadcastChannel.updateInput, function() {
                        return scope.updateInput(scope.inputText);
                    });
                    scope.inputArray_CheckBox_value_assigned = false;

                    $formobject.checkbox_get_values(scope);
                    $formobject.general_external_formobjects(scope);

                    if (scope.$component.arrayToText) { //for others, now working for personname
                        scope.inputArray = [];
                        scope.$watch('inputArray', function(newValue, oldValue) {
                            //console.log(newValue);
                            var checked, index, _ref;
                            if (newValue === oldValue) {
                                return;
                            }
                            checked = [];
                            for (index in scope.inputArray) {
                                if (scope.inputArray[index]) {
                                    //checked.push((_ref = scope.options[index]) != null ? _ref : scope.inputArray[index]);
                                    checked.push(scope.inputArray[index]);
                                }
                            }
                            return scope.inputText = checked.join(', ');
                        }, true);
                    }
                    scope.$watch('inputText', function() {
                        //console.log(scope.inputText);
                        return scope.updateInput(scope.inputText);
                    });

                    $rootScope.$on('inputTextUpdated', function(event, args) {
                          if(!!args.data && args.elementid===scope.$component.name)//scope.formObject.id)
                          {
                            //console.log(args.data);

                            //console.log(event);
                            //console.log(scope.formObject);
                            return scope.updateInput(args.data);
                          }
                    });

                    scope.$watch(attrs.fbFormObject, function() {
                        //console.log(scope.formObject);
                        return scope.copyObjectToScope(scope.formObject);
                    }, true);
                    scope.$watch('$component.template', function(template) {
                        var $input, $template, view;
                        if (!template) {
                            return;
                        }
                        $template = $(template);
                        $input = $template.find("[ng-model='inputText']");
                        $input.attr({
                            validator: '{{validation}}'
                        });
                        view = $compile($template)(scope);
                        return $(element).html(view);
                    });
                    if (!scope.$component.arrayToText && scope.formObject.options.length > 0) {
                        scope.inputText = scope.formObject.options[0];
                    }
                    return $formobject.set_values(scope);

                }
            };
        }
    ]);

}).call(this);

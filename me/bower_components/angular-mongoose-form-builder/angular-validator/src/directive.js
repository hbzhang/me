(function() {
  var $;

  $ = angular.element;

  angular.module('validator.directive', ['validator.provider']).directive('validator', [
    '$injector', function($injector) {
      return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attrs, ctrl) {
          var $parse, $validator, isAcceptTheBroadcast, model, observerRequired, onBlur, registerRequired, removeRule, rules, validate;
          $validator = $injector.get('$validator');
          $parse = $injector.get('$parse');
          model = $parse(attrs.ngModel);
          rules = [];
          validate = function(from, args) {
            var errorCount, increaseSuccessCount, rule, successCount, _fn, _i, _len;
            if (args == null) {
              args = {};
            }

            /*
            Validate this element with all rules.
            @param from: 'watch', 'blur' or 'broadcast'
            @param args:
                success(): success callback (this callback will return success count)
                error(): error callback (this callback will return error count)
                oldValue: the old value of $watch
             */
            successCount = 0;
            errorCount = 0;
            increaseSuccessCount = function() {
              var rule, _i, _len;
              if (++successCount >= rules.length) {
                ctrl.$setValidity(attrs.ngModel, true);
                for (_i = 0, _len = rules.length; _i < _len; _i++) {
                  rule = rules[_i];
                  rule.success(model(scope), scope, element, attrs, $injector);
                }
                if (typeof args.success === "function") {
                  args.success();
                }
              }
            };
            if (rules.length === 0) {
              return increaseSuccessCount();
            }
            _fn = function(rule) {
              return rule.validator(model(scope), scope, element, attrs, {
                success: function() {
                  return increaseSuccessCount();
                },
                error: function() {
                  if (rule.enableError && ++errorCount === 1) {
                    ctrl.$setValidity(attrs.ngModel, false);
                    rule.error(model(scope), scope, element, attrs, $injector);
                  }
                  if ((typeof args.error === "function" ? args.error() : void 0) === 1) {
                    try {
                      element[0].scrollIntoViewIfNeeded();
                    } catch (_error) {}
                    return element[0].select();
                  }
                }
              });
            };
            for (_i = 0, _len = rules.length; _i < _len; _i++) {
              rule = rules[_i];
              switch (from) {
                case 'blur':
                  if (rule.invoke !== 'blur') {
                    continue;
                  }
                  rule.enableError = true;
                  break;
                case 'watch':
                  if (rule.invoke !== 'watch' && !rule.enableError) {
                    increaseSuccessCount();
                    continue;
                  }
                  break;
                case 'broadcast':
                  rule.enableError = true;
                  break;
              }
              _fn(rule);
            }
          };
          registerRequired = function() {
            var rule;
            rule = $validator.getRule('required');
            if (rule == null) {
              rule = $validator.convertRule('required', {
                validator: /^.+$/,
                invoke: 'watch'
              });
            }
            return rules.push(rule);
          };
          removeRule = function(name) {

            /*
            Remove the rule in rules by the name.
             */
            var index, _i, _ref, _ref1, _results;
            _results = [];
            for (index = _i = 0, _ref = rules.length; _i < _ref; index = _i += 1) {
              if (!(((_ref1 = rules[index]) != null ? _ref1.name : void 0) === name)) {
                continue;
              }
              rules[index].success(model(scope), scope, element, attrs, $injector);
              rules.splice(index, 1);
              _results.push(index--);
            }
            return _results;
          };
          attrs.$observe('validator', function(value) {
            var match, name, rule, ruleNames, _i, _len, _results;
            rules.length = 0;
            if (observerRequired.validatorRequired || observerRequired.required) {
              registerRequired();
            }
            match = value.match(/^\/(.*)\/$/);
            if (match) {
              rule = $validator.convertRule('dynamic', {
                validator: RegExp(match[1]),
                invoke: attrs.validatorInvoke,
                error: attrs.validatorError
              });
              rules.push(rule);
              return;
            }
            match = value.match(/^\[(.+)\]$/);
            if (match) {
              ruleNames = match[1].split(',');
              _results = [];
              for (_i = 0, _len = ruleNames.length; _i < _len; _i++) {
                name = ruleNames[_i];
                rule = $validator.getRule(name.replace(/^\s+|\s+$/g, ''));
                if (typeof rule.init === "function") {
                  rule.init(scope, element, attrs, $injector);
                }
                if (rule) {
                  _results.push(rules.push(rule));
                } else {
                  _results.push(void 0);
                }
              }
              return _results;
            }
          });
          attrs.$observe('validatorError', function(value) {
            var match, rule;
            match = attrs.validator.match(/^\/(.*)\/$/);
            if (match) {
              removeRule('dynamic');
              rule = $validator.convertRule('dynamic', {
                validator: RegExp(match[1]),
                invoke: attrs.validatorInvoke,
                error: value
              });
              return rules.push(rule);
            }
          });
          observerRequired = {
            validatorRequired: false,
            required: false
          };
          attrs.$observe('validatorRequired', function(value) {
            if (value && value !== 'false') {
              registerRequired();
              return observerRequired.validatorRequired = true;
            } else if (observerRequired.validatorRequired) {
              removeRule('required');
              return observerRequired.validatorRequired = false;
            }
          });
          attrs.$observe('required', function(value) {
            if (value && value !== 'false') {
              registerRequired();
              return observerRequired.required = true;
            } else if (observerRequired.required) {
              removeRule('required');
              return observerRequired.required = false;
            }
          });
          isAcceptTheBroadcast = function(broadcast, modelName) {
            var anyHashKey, dotIndex, itemExpression, itemModel;
            if (modelName) {
              if (attrs.validatorGroup === modelName) {
                return true;
              }
              if (broadcast.targetScope === scope) {
                return attrs.ngModel.indexOf(modelName) === 0;
              } else {
                anyHashKey = function(targetModel, hashKey) {
                  var key, x;
                  for (key in targetModel) {
                    x = targetModel[key];
                    switch (typeof x) {
                      case 'string':
                        if (key === '$$hashKey' && x === hashKey) {
                          return true;
                        }
                        break;
                      case 'object':
                        if (anyHashKey(x, hashKey)) {
                          return true;
                        }
                        break;
                    }
                  }
                  return false;
                };
                dotIndex = attrs.ngModel.indexOf('.');
                itemExpression = dotIndex >= 0 ? attrs.ngModel.substr(0, dotIndex) : attrs.ngModel;
                itemModel = $parse(itemExpression)(scope);
                return anyHashKey($parse(modelName)(broadcast.targetScope), itemModel.$$hashKey);
              }
            }
            return true;
          };
          scope.$on($validator.broadcastChannel.prepare, function(self, object) {
            if (!isAcceptTheBroadcast(self, object.model)) {
              return;
            }
            return object.accept();
          });
          scope.$on($validator.broadcastChannel.start, function(self, object) {
            if (!isAcceptTheBroadcast(self, object.model)) {
              return;
            }
            return validate('broadcast', {
              success: object.success,
              error: object.error
            });
          });
          scope.$on($validator.broadcastChannel.reset, function(self, object) {
            var rule, _i, _len;
            if (!isAcceptTheBroadcast(self, object.model)) {
              return;
            }
            for (_i = 0, _len = rules.length; _i < _len; _i++) {
              rule = rules[_i];
              rule.success(model(scope), scope, element, attrs, $injector);
              if (rule.invoke !== 'watch') {
                rule.enableError = false;
              }
            }
            return ctrl.$setValidity(attrs.ngModel, true);
          });
          scope.$watch(attrs.ngModel, function(newValue, oldValue) {
            if (newValue === oldValue) {
              return;
            }
            return validate('watch', {
              oldValue: oldValue
            });
          });
          onBlur = function() {
            if (scope.$root.$$phase) {
              return validate('blur');
            } else {
              return scope.$apply(function() {
                return validate('blur');
              });
            }
          };
          $(element).bind('blur', onBlur);
          return scope.$on('$destroy', function() {
            return $(element).unbind('blur', onBlur);
          });
        }
      };
    }
  ]);

}).call(this);

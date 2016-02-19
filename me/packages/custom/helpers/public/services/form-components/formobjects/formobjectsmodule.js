/**
 * Created by hbzhang on 6/30/15.
 */
angular.module('external_formobjects.provider', ['formcoverphotoupload.provider']).provider('$external_formobjects', function() {
    var $http, $injector, $templateCache, $rootScope,$formcoverphotoupload;
    $injector = null;
    $http = null;
    $templateCache = null;
    $rootScope = null;
    $formcoverphotoupload = null;

    this.setupProviders = (function(_this) {
        return function(injector) {
            $injector = injector;
            $http = $injector.get('$http');
            $rootScope = $injector.get('$rootScope');
            $formcoverphotoupload = $injector.get('$formcoverphotoupload');
            return $templateCache = $injector.get('$templateCache');
        };
    })(this);

    this.execute_scope_functions = (function(_this) {
        return function(scope) {
            $formcoverphotoupload.upload_coverphoto_functions(scope);
        };
    })(this);

    this.$get = [
        '$injector',(function(_this) {
            return function($injector,navtreefactory) {
                //navtreefactory.nav_tree_build('asdasd');
                var component, name, _ref;
                _this.setupProviders($injector);
                return {
                    execute_scope_functions: _this.execute_scope_functions
                };
            };
        })(this)
    ];
});

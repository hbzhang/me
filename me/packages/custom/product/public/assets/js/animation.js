/**
 * Created by hbzhang on 10/28/14.
 */
angular.module('animation', ['angular-loading-bar'])
    .config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
        cfpLoadingBarProvider.includeBar = true;
    }]);
(function() {
  var navtree = angular.module('navtreeModule', ['ng']);
  navtree.factory('navtreefactory', [
    '$rootScope',
    function($rootScope) {

           var nav_tree = [{
          root: '',
          data: [],
          name: name,
          componentname:'',
          layer: 1,
          child:[]
        }];

        var nav_tree_build = (function(_this) {
            return function(navtree_element) {
                //this.nav_tree_raw.push(navtree_element);
                console.log(navtree_element);
            };
        })(this);

      return {
        nav_tree_build: nav_tree_build
      };
    }]);

}).call(this);
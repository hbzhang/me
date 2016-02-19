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
/*
 tree for form element navigation.
 */
(function() {
    angular.module('service.tree', []).provider('$navtree', function() {
        var $http, $injector, $templateCache,$rootScope;
        $injector = null;
        $http = null;
        $templateCache = null;
        $rootScope = null;

        this.nav_tree_raw = [];
        this.nav_tree = [];
        this.nav_tree_array = [];
        this.nav_tree_array_child = [];


       this.gen_nav_tree_random_string = (function(_this) {
          return function() {
            return Math.random().toString(36).substring(2,12);
        }
        })(this);

        this.get_nav_tree_array = (function(_this) {
          return function() {
            return _this.nav_tree_array;
        }
        })(this);

        this.nav_tree_build = (function(_this) {
            return function(navtree_element) {
                _this.nav_tree_raw = navtree_element;
                _this._nav_tree_build();
            };
        })(this);

    
        this._nav_tree_build = (function(_this) {
            return function() {
                 _this.nav_tree = []; _this.nav_tree_array = [];
                _.map(_this.nav_tree_raw,function(item){
                        var treecompoment = {component:item.component};
                        var result = _.extend(treecompoment, item.nav_tree[0]);
                        _this.nav_tree.push(result);
                });

                 var root_object_array = _.groupBy(_this.nav_tree, 'root');
  
                 _this._recursive_tree_build(root_object_array);

            };
        })(this);
    

       this._recursive_tree_build = (function(_this) {
        
           return function(object_array) {

                _.map(object_array,function (value, key) {
           
                  var firstchild_array = _.groupBy(value , 'group');

                  firstchild_array =  _this._recursive_tree_build_continue(firstchild_array);

                  var tree_item= {
                        name:key,
                        child:firstchild_array
                    };

                     /*  var  aready_exist = false;

                     _.map(_this.nav_tree_array,function(item) {

                         if(item.name === key) {
                          //var match = _.where(nameInfo , {name:key });
                          _.map(item.child, function(childvalue, childkey){

                           // if(childvalue.uniqueid ====) 

                          });
                          item = tree_item; 
                          aready_exist = true; 
                         }
                    
                     });

                     if(!aready_exist) */

                  //this._recursive_tree_build()

                 _this.nav_tree_array.push(tree_item); 

                });


            };
        })(this);


        this._recursive_tree_build_continue  = (function(_this) {
        
           return function(child_array) {

                var child_array_temp = child_array;

           
                _.map(child_array_temp,function (value, key) {

                  
                  var to_grouped_child = [];
                  _this.nav_tree_array_child = [];

                   
                   _.map(value,function (item) {


                      /*while(item.child.length >0) {

                          item = item.child;
                      }*/

                 

                     if(item.child.length >0) { 
                         item.child[0].component = item.component;
                         to_grouped_child.push(item.child[0]);
                      }

                    });

                  
                    var firstchild_array = _.groupBy(to_grouped_child, 'group');


                   
                     _.map(firstchild_array,function (value0, key) {
                             var tree_item= {
                                  is_collection:true
                              };

                             var result = [];

                             _.map(value0,function(value1,key){
                                 //result.push(_.extend(tree_item, value1));
                                  result.push(value1);

                             });

                             _this.nav_tree_array_child.push(result);

                       });
              
              


                 

                   if(_this.nav_tree_array_child.length > 0){
                      child_array[key] = _this.nav_tree_array_child;
                   }
                  else{

                            var tree_item= {
                                  is_collection:false
                              };
                             
                             /*var result = [];
                             _.map(value,function(value1,key){
                                   result.push(_.extend(tree_item, value));
                             }); */

                             //child_array[key] = _.extend(tree_item, value);

                  }


                });

                return child_array;
                
            };
        })(this);


        this.setupProviders = (function(_this) {
            return function(injector) {
                $injector = injector;
                $http = $injector.get('$http');
                $rootScope = $injector.get('$rootScope');
                return $templateCache = $injector.get('$templateCache');
            };
        })(this);
 
        this.$get = [
            '$injector', (function(_this) {
                return function($injector) {
                    var component, name, _ref;
                    _this.setupProviders($injector);
                    _ref = _this.components;
                    for (name in _ref) {
                        component = _ref[name];
                        _this.loadTemplate(component);
                    }
                    return {
                        nav_tree_raw:_this.nav_tree_raw,
                        nav_tree_build:_this.nav_tree_build,
                        gen_nav_tree_random_string:_this.gen_nav_tree_random_string,
                        get_nav_tree_array:_this.get_nav_tree_array
                    };
                };
            })(this)
        ];
    });

}).call(this); 


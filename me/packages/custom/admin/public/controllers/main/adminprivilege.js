/**
 * Created by hbzhang on 5/4/15.
 */
'use strict';

/*
 var app, deps;

 deps = []; //['angularBootstrapNavTree'];

 if (angular.version.full.indexOf("1.2") >= 0) {
 deps.push('ngAnimate');
 }
 */

//var app = angular.module('mean.practice');//, deps);
//http://nickperkinslondon.github.io/angular-bootstrap-nav-tree/test/bs3_ng120_test_page.html
angular.module('mean.admin').controller('AdminPrivilegeController', ['$scope',
    'Global','createDialog','PrivilegeData','$rootScope','$http','ModulesHelper','formtoaster',
    'PrivilegeURLItem','PrivilegeTestMode',
    function($scope, Global,createDialogService,PrivilegeData,$rootScope,
             $http,ModulesHelper,formtoaster,PrivilegeURLItem,
             PrivilegeTestMode) {
        $scope.global = Global;

        // app.controller('AbnTestController', function($scope, $timeout) {

        var tree;

        $scope.my_tree = tree = {};

       PrivilegeURLItem.verifyURLItem(function(display){

           $scope.displaytheitem = display;

           if(PrivilegeTestMode.is_test()){

               $scope.displaytheitem = true;
           }

       });


        $scope.pop = function(){
            formtoaster.now.success('Your changes have been saved.');
        };

        $scope.my_tree_handler = function(branch) {
            var _ref;
            $scope.output =  branch;
            $rootScope.$emit('privilegetreedataitemclicked', {
                data: branch
            });
            //console.log(branch);
            /*if ((_ref = branch.data) != null ? _ref.description : void 0) {
                return $scope.output += '(' + branch.data.description + ')';
            }*/
        };

        $rootScope.$on('privilegetreeitemdataupdated', function(event, args) {
            if(args.data.length>=0)
            {
                if(!_.isEmpty(tree)){
                    var selected = tree.get_selected_branch();
                    if(!!selected) {
                        selected.data = args.data;
                        var parent = tree.get_parent_branch(selected);
                        while(!!parent){
                            parent = $scope.update_parent_privileges(selected);
                            selected = parent;
                        }

                    }
                    tree.expand_all();
                }

                //$scope.privileges = args.data;
                //$scope.saveroles();
            }
        });

        $rootScope.$on('packageitemdataupdated', function(event, args) {
            if(!!args.data)
            {
                var child,selected,siblings;

                if(!_.isEmpty(tree)){
                    selected = tree.get_selected_branch();
                    if(!!selected && selected.package!=='PACKAGE-COLLECTION') {
                        selected.package = args.data.text;
                        var parent = tree.get_parent_branch(selected);
                        $scope.update_sibling_parent_packages(selected);
                        child =  $scope.update_sibling_children_packages(selected);
                    }

                   //this may need more work!
                    siblings = tree.get_siblings(child);
                    _.map(siblings, function(child){

                        while(!!child){
                            selected =  $scope.update_sibling_children_packages(child);
                            child = selected;
                        }
                    });

                }

                //$scope.privileges = args.data;
                //$scope.saveroles();
            }
        });



        $scope.update_parent_privileges = function(selected){

            var collection = [];
            var siblings = tree.get_siblings(selected);
            var parent = tree.get_parent_branch(selected);

            if(!!parent) {
                if(!!siblings) {
                    _.map(siblings, function (item) {

                        collection = collection.concat(item.data);
                    });
                }

                collection =_.uniq(collection);

                parent.data = collection;
            }
            return parent;
        };

        $scope.update_sibling_parent_packages = function(selected){

            var collection = [];
            var siblings = tree.get_siblings(selected);
            var parent = tree.get_parent_branch(selected);
            var child = tree.get_first_child(selected);
            //console.log(child);
            if(!!siblings && !child) {
                _.map(siblings, function (item) {
                    if(item.package!=='PACKAGE-COLLECTION')
                    item.package = selected.package;
                });
            }

            if(!!parent && parent.package!=='PACKAGE-COLLECTION') {
                parent.package  = selected.package;
            }
        };

        $scope.update_sibling_children_packages = function(selected){

            var collection = [],child, siblings;
            child = tree.get_first_child(selected);
            if(!!child)
            siblings = tree.get_siblings(child);
            //console.log(child);
            if(!!siblings && !!child) {
                _.map(siblings, function (item) {
                    if(item.package!=='PACKAGE-COLLECTION')
                        item.package = selected.package;
                });
            }
            return child;
        };

        $scope.expand_all = function() {
            tree.expand_all();
        };

        $scope.collapse_all = function() {
            tree.collapse_all();
        };

        $scope.save_changes = function() {
            //do not save selection state
            tree.select_none();
            $scope.saveroles();
            $scope.pop();
        };

        $scope.saveroles = function() {
            $http.post('/all_roles_for_privileges', {
                privileges:  $scope.my_data,
                date: Date.now()
            }).success(function() {
                //$scope.pop();
            }).error(function(error) {
                $scope.savePrivilegeError = error;
            });
        };

        $scope.get_privileges= function() {
            $scope.my_data = [];
            $http.get('/privileges').
                success(function(data, status, headers, config) {
                    if(!!data[0])
                    {
                        if(data[0].privileges.length ===0)
                          $scope.my_data = PrivilegeData.treedata;
                        else
                          $scope.my_data = data[0].privileges;
                    }
                    else
                        $scope.my_data = PrivilegeData.treedata;

                    //console.log($scope.my_data);

                }).
                error(function(data, status, headers, config) {
                    $scope.my_data = PrivilegeData.treedata;
            });

        };

        $scope.get_privileges();

        $scope.try_renaming_a_branch = function(){
            var b;
            b = tree.get_selected_branch();
            b.label =  $scope.treeitemname;
        };

        $scope.try_adding_a_root_branch = function() {
            var b;
            b = tree.get_selected_branch();
            //console.log($scope.treeitemname);
            tree.add_root_branch({
                label: $scope.treeitemname,
                data: {
                    something: 42,
                    "else": 43
                }
            });
        };


        $scope.try_adding_a_branch = function() {
            var b;
            b = tree.get_selected_branch();
            //console.log($scope.treeitemname);
            tree.add_branch(b, {
                label: $scope.treeitemname,
                data: {
                    something: 42,
                    "else": 43
                }
            });
        };
        /*tree.add_root_branch({
         label: $scope.teamname ,
         data: {
         something: 42,
         "else": 43
         }});

         };*/

        $scope.try_deleting_a_branch = function() {
            var b;
            console.log(tree);
            b = tree.get_selected_branch();
            tree.delete_branch(b);
            //tree.delete_root_branch(b);
            console.log($scope.my_data);
            return;
        };

       $scope.packageoptions = [];

       $scope.add_packages_to_dropdown = function (){

              ModulesHelper.all_modules(function(allmodules){

                  $scope.packageoptions = allmodules;

                  //console.log( $scope.packageoptions );
              });
       };

       $scope.add_packages_to_dropdown();


       $rootScope.$on('privilegetreedataitemclicked', function(event, args) {

            if(!!args.data)
            {

                $scope.packageoptionsselected = {

                    text: args.data.package,
                    value: args.data.order
                };

            }
        });


        $scope.$watch('packageoptionsselected', function(newVal, oldVal) {

            $rootScope.$emit('packageitemdataupdated', {
                data: newVal
            });

        }, true);



       /* $scope.ddSelectOptions = [
            {
                text: 'Option1',
                value: 'a value'
            },
            {
                text: 'Option2',
                value: 'another value',
                someprop: 'somevalue'
            },
            {
                 divider: true
            },
            {
               divider: true,
                text: 'divider label'
            },
            {
                text: 'Option4',
                href: '#option4'
            }
        ];

        $scope.ddSelectSelected = { text: 'Option2',
            value: 'a value'}; // Must be an object
      */


    }]);


/*   $rootScope.$emit('privilegetreedataitemclicked', {
 data: $scope.output
 });

 $rootScope.$on('privilegetreedataitemclicked', function(event, args) {

 if(!!args.data)
 {
 console.log(args.data.label);
 }

 });

 item_selected = function(branch) {
 return $scope.output = "Item Name: " + branch.label;
 };

 $http.get('  admin/services/secondary/systemusers.json')
 .then(function(res){
 $scope.todos = res.data;
 });
 */

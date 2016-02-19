/**
 * Created by hbzhang on 6/2/15.
 */

'use strict';

angular.module('mean.admin').controller('ItemPrivilegeController', ['$scope',
    'Global','createDialog','ItemData','$rootScope','$http',
    'ModulesHelper','formtoaster',
    'PrivilegeURLItem','PrivilegeTestMode',
    'DataCommunication',
    function($scope, Global,createDialogService,ItemData,$rootScope,
             $http,ModulesHelper,formtoaster,PrivilegeURLItem,
             PrivilegeTestMode,DataCommunication
    ) {

    $scope.global = Global;

    $scope.my_data = [];

    var tree;

    $scope.my_tree = tree = {};

    $scope.my_tree_handler = function(branch) {
            var _ref;
            $scope.output =  branch;
            $rootScope.$emit('privilegetreedataitemclicked', {
                data: branch
            });
            /*if ((_ref = branch.data) != null ? _ref.description : void 0) {
             return $scope.output += '(' + branch.data.description + ')';
             }*/
    };

    $scope.my_data = $scope.$parent.tree_data;

    $rootScope.$on('adminformroleready', function(event, args) {

        $scope.my_data = args.data;
    });

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
            }
        });

    $scope.$watch('my_data', function(newVal, oldVal) {

            $rootScope.$emit('adminformroledataupdated', {
                data:  $scope.my_data
            });

        }, true);


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

 }]);


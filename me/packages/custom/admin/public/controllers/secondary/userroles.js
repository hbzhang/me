/**
 * Created by hbzhang on 5/1/15.
 */
'use strict';

angular.module('mean.admin').controller('UserRolesController',  [
    '$rootScope', '$scope','Global','$http','RegisterService',
    'Restangular','toaster','$location','formtoaster','$filter','JSTagsCollection','InputService','DataFilterHelper',
    function($rootScope,$scope,Global,$http,RegisterService,Restangular,
             toaster,$location,formtoaster,$filter,JSTagsCollection,InputService,DataFilter) {


        $scope.getsuggestions = function () {

            // Build static suggestions array
            var suggestions = ['admin','authenticated'];

            suggestions = suggestions.map(function (item) {
                return {"value": item}
            });

            $scope.tags = new JSTagsCollection();

            $scope.role_TagOptions = {
                'edit': true,
                'tags': $scope.tags
            };

            //$scope.service = new InputService();


            $scope.tagarray = function(){

                var tagarray = [];

                //console.log(InputService.input);

                //console.log($scope.tags.getNumberOfTags);

                _.each($scope.tags.tags, function(value, key) {
                        tagarray.push(value);
                });

                return tagarray;

            };

            // Instantiate the bloodhound suggestion engine
            var suggestions = new Bloodhound({
                datumTokenizer: function (d) {
                    return Bloodhound.tokenizers.whitespace(d.value);
                },
                limit: 1000000,
                queryTokenizer: Bloodhound.tokenizers.whitespace,
                remote: {
                    //users and emails
                    url: 'http://localhost:3000/userrolesandemails',
                    filter: function (data){

                        $rootScope.$on('jsTagsInputValue', function(event, args) {


                            $rootScope.$broadcast('jsTags', {value: $scope.tags});

                            if(!!args.value)
                            {

                                $scope.jsTagInputText = args.value;
                            }
                        });

                        data = $filter('filter')(data, $scope.jsTagInputText , undefined);

                        //data = DataFilter.filter_array_with_array(data,$scope.jsTagInputText);
                        //console.log($scope.jsTagInputText);
                        //console.log(data);

                        return _.map(data, function (item) {
                            //console.log(item);
                            return {
                                value: item
                            };
                        });
                    }


                }
                /*filter: function (data) {
                 console.log(data);
                 var roles = [];
                 if (data) {
                 _.each(data, function (value) {
                 if (value.roles.length > 0) {
                 roles = [];
                 console.log(value.roles);
                 var index = 0;
                 _.each(value.roles, function (item) {
                 roles.push(value.roles[index]);
                 index = index + 1;
                 });

                 }

                 });
                 return roles;
                 }
                 }*/
                // local: suggestions


            });


            // Initialize the bloodhound suggestion engine
            suggestions.initialize();

            $scope.exampleData = {
                //displayKey: 'suggestion',
                name: 'roles',
                displayKey: 'value',
                source: suggestions.ttAdapter()
            };

            // Typeahead options object
            $scope.exampleOptions = {
                hint: false,
                highlight: true
            };
        };

        $scope.getsuggestions();

         $scope.getallroles = function(query) {
            var roles = [];
            $http.get('/userroles').
                success(function (data, status, headers, config) {

                        return  data;

                }).
                error(function (data, status, headers, config) {
                    console.log('failed to load the roles');
                    //alert('error');
                    //$('.progress-striped').hide();

                });

        };

       //$scope.getallroles();

       //console.log(suggestions);


    }]);



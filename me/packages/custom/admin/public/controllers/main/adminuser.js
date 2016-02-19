/**
 * Created by hbzhang on 4/27/15.
 */
'use strict';

angular.module('mean.admin').controller('UserAdminEditController',  [
    '$rootScope', '$scope','Global','$http','RegisterService',
    'Restangular','toaster','$location','formtoaster','$filter','JSTagsCollection',
    'PrivilegeURLItem','PrivilegeTestMode',
    function($rootScope,$scope,Global,$http,RegisterService,Restangular,
             toaster,$location,formtoaster,$filter,JSTagsCollection,
             PrivilegeURLItem,PrivilegeTestMode) {
        $scope.global = Global;


        PrivilegeURLItem.verifyURLItem(function(display){

            $scope.displaytheitem = display;

            if(PrivilegeTestMode.is_test()){

                $scope.displaytheitem = true;
            }

        });

        $scope.pop_updated = function(){
            //toaster.pop('success', "", 'This registration was just updated', 4500, 'trustedHtml', 'goToLink');
            formtoaster.now.success('The user was just updated.');
        };

        $scope.saveroles = function() {

            $scope.updateduserinfor.roles = _.uniq($scope.updateduserinfor.roles);

            $http.post('/userroles', {
                roles:  $scope.updateduserinfor.roles,
                date: Date.now()
            }).success(function() {
                //$scope.pop();
                //$rootScope.users = $scope.users;
                //$rootScope.$emit('loggedin');
            }).error(function(error) {
                // Error: authentication failed
                $scope.agreementError = error;
            });

        };

        $scope.loadTags = function(query) {
            //var data = $http.get('admin/services/secondary/systemusers.json');
            //with text as the json key
            var data = $http.get('/userroles_special_key');
            //console.log(data);
            return data;
            //return $scope.userinformation.roles;
            //return $http.get('/tags?query=' + query);
        };

        var users = Restangular.all('user');

        $scope.getusers = function() {
            $scope.userdata = []; $scope.userdata_email = [];
            users.getList().then(function(user) {
                _.each(user, function(value) {
                    value.roles = _.uniq(value.roles);
                    var el = {
                            'name': value.name,
                            'email':value.email,
                            'username':value.username,
                            'roles': value.roles.join(),
                            'id':value._id
                          };

                    var el_email = {
                        'email':value.email
                    };

                    $scope.userdata.push(el);

                    $scope.userdata_email.push(el_email);
                });
                //console.log($scope.userdata);

            });
        }
        $scope.getusers();

        // FOR UI GRID
        //http://plnkr.co/edit/Tr9cNm0lDy62dmF7LNlr?p=preview
        $scope.searchUserText = '';
        $scope.userinformation = { roles:''};

        $scope.userroles = [];

        $scope.refreshData = function() {
            $scope.userinformation_email = $filter('filter')($scope.userdata_email, $scope.filterOptions.filterText, undefined);

            //console.log($scope.userinformation_email);

            if ( $scope.userinformation_email.length >0) {
                $scope.userinformation = $filter('filter')($scope.userdata,  $scope.userinformation_email[0].email, undefined);

                if($scope.userinformation.length>0) {
                    $scope.userroles = [];
                    var el = {
                        text: $scope.userinformation[0].roles
                    };
                    $scope.userroles.push(el);

                }
            }

        };

        $scope.filterOptions = {
            filterText: ''
        };

        $scope.userGridOptions = {
            data: $scope.userdata,
            filterOptions: $scope.filterOptions,
            enableFiltering: true,
            infiniteScrollRowsFromEnd: 40,
            infiniteScrollUp: true,
            infiniteScrollDown: true
        };

        $scope.userGridOptions.columnDefs = [
            { name: 'name'},
            { name: 'email'},
            { name: 'roles'}
        ];

        $scope.submit = function(){
            $scope.userinformation[0].roles = [];
            _.each($scope.userroles, function(value) {
                $scope.userinformation[0].roles.push(value.text);
            });
            var roles = $scope.userinformation[0].roles.join().split(",");;
            $scope.userinformation[0].roles = []
            $scope.userinformation[0].roles = roles;
            $scope.updateduserinfor = $scope.userinformation[0];
            //console.log($scope.userinformation[0]);
            $scope.updateuser();
            $scope.pop_updated();
        };

        $scope.updateuser = function(){
            //console.log('USERID: ' + $scope.global.user._id);
            Restangular.one('user/' +  $scope.updateduserinfor.id).customPUT( $scope.updateduserinfor).then(function(response) {
                //console.log("response: %o", response);
                $scope.saveroles();
            }, function(response) {
                console.log("error");
            });

        };

        // $scope.pt = SlidePanelContentData.getMeds($route.current.params.id);
    }]);



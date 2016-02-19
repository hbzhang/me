/**
 * Created by hbzhang on 1/14/15.
 */
'use strict';

angular.module('registration',['ngSanitize','ui.grid','restangular','toaster','formtoaster','ngCsv']).factory('RegisterService',['$resource','$rootScope', function($resource,$rootScope) {

   var resource = {
        register: $resource('/registration/:id', {get: {method: 'GET', params:{}, isArray: true}}, {id:'@id'},{update: {method: 'PUT'}}, {query: {method: 'GET', params:{}, isArray: true}})
    };
    return resource;

    //return $resource('/registration/:registrationID');

}]).controller('ListItemRegisterController', ['$rootScope', '$scope','Global','$http','RegisterService',
    'Restangular','toaster','$location','formtoaster',
    function($rootScope,$scope,Global,$http,RegisterService,Restangular,toaster,$location,formtoaster) {
        $scope.global = Global;

        //$scope.register = new Register(); //You can instantiate resource class

        //console.log(RegisterService.register);

   /*   $scope.id = '54aab8cc8c23c564cc14d6c9';

        $scope.registerget =  RegisterService.register.query({ id: $scope.id }, function(register) {
            //console.log(register);
        }); // get() returns a single register

        $scope.registerquery = RegisterService.register.query(function(registeries) {
            //console.log(registeries);
        }); //query() returns all the registers

        //$scope.entry.data = 'some data';

        //comment out now
        $scope.registersave = RegisterService.register.save($scope.register, function() {
            //data saved. do something here.
        });
   */

        $scope.pop_removed = function(){
            //toaster.pop('success', "", 'This registration was just updated', 4500, 'trustedHtml', 'goToLink');
            formtoaster.now.warning('The register was just removed.');
        };

        //http://plnkr.co/edit/9gkr2NkGpdyEdG6oV1Fs?p=preview

        $scope.gridOptions = {

            enableFiltering: true
        };


        $scope.clickHandler = {
            onClick : function(value){
                //alert('Name: '+value);
                //$scope.gridOptions.data.push(el);
                var index = 0;
                _.each( $scope.gridOptions.data,function(item) {
                    //console.log(item);
                    if (!!item && value === item.Id) {
                        $scope.gridOptions.data.splice(index, 1);
                        $scope.removeRegister(item.Id);
                    }
                    index = index + 1;
                });

            }
        };


        $scope.removeRegister = function(value){
            Restangular.one("registration", value).remove().then(function() {
                $scope.pop_removed();
            });
        };


        $scope.gridOptions.columnDefs = [
            { field: 'Id', visible: false, displayName: 'UserId' },
            { name: 'UserName' },
            { name: 'Information',
                cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()"><a href="{{COL_FIELD}}">Details</a></div>'
            },
            { name: 'Remove',
                cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()">  <button class="btn btn-danger {{getExternalScopes().deleteButtonClass(row)}} btn-xs btn-block" ng-click="{{COL_FIELD}}"><span class="glyphicon glyphicon-trash"></span></button></div>'
            }
        ];

        var registers = Restangular.all('registration');
        var items = Restangular.all('item');

        var itemid = $location.path().split('/')[2];

        $scope.filename = itemid;

        $scope.getregisters = function() {
            $scope.getData = [];
            registers.getList().then(function(registers) {
                _.each(registers, function(value) {

                    if(value.reasonforregister === itemid ) {
                        var el = {
                            'Id':value._id,
                            'UserName': value.users.name,
                            'Information': '/#!/itemsubmissiondetails/'+value.reasonforregister+'-'+value._id,
                            'Remove': 'getExternalScopes().onClick(\''+  value._id + '\')' //'removeItemRegisteredContent(\''+ value._id + '\')'
                        };

                        $scope.gridOptions.data.push(el);

                        $scope.rowcontent = {};  $scope.getHeader = [];
                        $scope.getHeader.push('User Name');
                        $scope.rowcontent['User Name'] = value.users.name;
                        _.each(value.information, function(item) {
                            $scope.rowcontent[item.label] = item.value;
                            $scope.getHeader.push(item.label);

                        });
                        $scope.getData.push($scope.rowcontent);

                    }

                });
                //console.log($scope.getData);
                //console.log($scope.getHeader);

            });
        }
       $scope.getregisters();



    }]).controller('ItemRegistrationDetailsController', ['$scope','Global',
        'Restangular','Program','$location','$builder','$validator','toaster','formtoaster',
        function($scope,Global,Restangular,Program,$location,$builder,$validator,toaster,formtoaster) {
            $scope.global = Global;

            $scope.pop = function(){
                //toaster.pop('success', "", 'This registration was just updated', 4500, 'trustedHtml', 'goToLink');
                formtoaster.now.success('The register was just updated.');
            };

            var getRegistrationID = function(){

                var program = $location.path().split('/')[2];

                var programarray = Program.programarray(program, '-');

                $scope.registrationid = programarray[programarray.length-1];

                $scope.itemid = programarray[programarray.length-2];

                //console.log($scope.registrationid);
            };
            getRegistrationID();

            $builder.removeAllObjects('registeredform');
            $scope.input = [];
            $scope.registeredvalue = {};

            $scope.addFormObject = function(item){
                for (var j = 0; j < item.itemformbuilder.length; j++) {
                    //item.itemformbuilder[j].id = 'itembuiltinforms' + j;
                    item.itemformbuilder[j].id = 'item' + j;
                    $builder.addFormObject('registeredform', item.itemformbuilder[j]);
                }
            };


            var registers = Restangular.all('registration');

            $scope.getregisters = function() {
                registers.getList().then(function(registers) {
                    _.each(registers, function(value) {
                        if(value._id ===  $scope.registrationid ){

                            _.each(value.information,function(item) {
                                //console.log(item.id);
                                $scope.registeredvalue[item.id] = item.value;
                            });
                        }
                    });

                });
            };

            var items = Restangular.all('item');

            $scope.getcreateditems = function() {
                items.getList().then(function(items) {

                    _.each(items,function(value) {

                        if(value._id === $scope.itemid ) {
                            $scope.getregisters();
                            //$rootScope.$broadcast('addbuiltinform', {data: newValue, elementid:'formprogramtextbox'});
                            $scope.addFormObject(value);

                        }});
                })
                //$state.forceReload();
            };

            $scope.getcreateditems();

            $scope.updateregister = function(){
                //console.log('USERID: ' + $scope.global.user._id);
                Restangular.one('registration/' + $scope.registrationid).get().then(function(register) {
                    register.information = $scope.input;
                    register.reasonforregister = $scope.itemid;
                    register.users = $scope.global.user._id;
                    register.qrcode = [];
                    register.save();
                    $scope.pop();
                });
            };

}]);




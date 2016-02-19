/**
 * Created by hbzhang on 2/12/15.
 */
'use strict';

angular.module('mean.admin').controller('CreateFormController',  [
    '$scope', '$builder', '$validator', 'CreateForm', '$http','Global',
    'formtoaster','Restangular','$rootScope','PrivilegeURLItem',
    'ItemData',
     function($scope, $builder, $validator, CreateForm,$http,Global,
              formtoaster,Restangular,$rootScope,
              PrivilegeURLItem,ItemData) {

      $scope.global = Global;
      // $scope.checked;

      $scope.package = {
            name: 'admin'
        };

      $scope.tree_data =  ItemData.item_privilege;

      $scope.clearforms = function(){

             $rootScope.$emit('needtoclearformlist', {
                 data: ''
             });
      };

      $rootScope.$on('adminformroledataupdated', function(event, args) {
          if(args.data.length>=0)
          {
                 $scope.formroles = args.data;
          }
      });

       PrivilegeURLItem.verifyURLItem(function(display){

             $scope.displaytheitem = display;
       });

        $scope.role_TagOptions = [];

        $scope.pop = function(){
            formtoaster.now.success('Your form was just created.');
        };

        $scope.pop_error = function(){
             formtoaster.now.error('There are errors in your submission. Likely you have forgot to fill out all required fields' +
             ' You have to fix them before you can submit.');
         };


        var forms = Restangular.all('form');

        $builder.removeAllObjects('formbuiltinforms');

        $builder.removeAllObjects('createform');

        $scope.form = $builder.forms['formbuiltinforms'];


        $scope.saveform = function(){
            //console.log('USERID: ' + $scope.global.user._id);
            return $validator.validate($scope, 'formbuiltinforms').success(function() {
            //console.log($scope.createform);
            //console.log($scope.input);
            var form = {};
            form.formbasicinformation = $scope.input;
            form.formformbuilder =  $scope.createform;
            form.formcreator = $scope.global.user._id;
            form.formroles = $scope.formroles;
            forms.post(form);
             $scope.pop();
            }).error(function() {
             $scope.pop_error();
            });
        };

        $scope.init = function () {
             CreateForm.builtinforms();
        };

        //$scope.formbuiltinforms = $builder.forms['formbuiltinforms'];
        $scope.createform = $builder.forms['createform'];
        $scope.input = [];
        $scope.defaultValue = {};
        return $scope.submit = function() {
            return $validator.validate($scope, 'default').success(function() {
                $scope.saveform();
                //$scope.getforms();
                return console.log('success');
            }).error(function() {
                return console.log('error');
            });
        };
        // $scope.pt = SlidePanelContentData.getMeds($route.current.params.id);
    }]).controller('UpdateListFormController',  [
    '$scope', '$rootScope',
    function($scope, $rootScope) {

        $scope.updateforms = function(){

            $rootScope.$emit('needtoupdateformlist', {
                data: ''
            });
        };

    }])
    .controller('ListFormController',  [
        '$scope', '$builder', '$validator', 'CreateForm', '$http','Global','formtoaster','Restangular',
        '$timeout','$state', '$window','$rootScope',
        function($scope, $builder, $validator, CreateForm,$http,Global,formtoaster,
          Restangular,$timeout,$state,$window,
          $rootScope) {
            $scope.global = Global;

            $scope.pop = function(){
                formtoaster.now.success('Your form was just created.');
            };

            $scope.pop_removed = function(){
                formtoaster.now.warning('Your form was just removed.');
            };

            var forms = Restangular.all('form');

            var builtinformnameid = [
                {id: 'formnametextbox'}
            ];

            var builtinformprogramid = [
                 {id: 'formprogramtextbox'}
            ];

            var builtinformdesciptioneid = [
                {id: 'formdescriptiontextbox'}
            ];

            var refresh = function(data){
                if(data.length > 0){
                    /*$scope.$on('$stateChangeSuccess', function () {
                        $timeout(function () {
                            $state.go($state.current, {}, {reload: true});
                        }, 100);
                    });*/
                    $timeout(function () {
                        $window.location.reload();
                    }, 100);

                }

            };
            $scope.getforms = function() {
                forms.getList().then(function(forms) {
                    $scope.allForms = [];
                    _.each(forms, function(value) {

                        var formname = _.filter(value.formbasicinformation, function(formbasic){
                            return _.find(builtinformnameid, function(builtin){
                                return formbasic.id === builtin.id;
                            });
                        });

                        var formprogram = _.filter(value.formbasicinformation, function(formbasic){
                            return _.find(builtinformprogramid, function(builtin){
                                return formbasic.id === builtin.id;
                            });
                        });

                        var formdescription = _.filter(value.formbasicinformation, function(formbasic){
                            return _.find(builtinformdesciptioneid, function(builtin){
                                return formbasic.id === builtin.id;
                            });
                        });

                        var forminformation = {'id' : value._id, 'name':formname, 'program': formprogram, 'description':formdescription};


                        $scope.allForms.push(forminformation);

                    });

                    //refresh($scope.allForms);
                });
            }

            $scope.getforms();

            $rootScope.$on('needtoupdateformlist', function(event, args) {
                $scope.getforms();
            });

            $rootScope.$on('needtoclearformlist', function(event, args) {
                $scope.allForms = [];
            });

            //$timeout( $scope.getforms(), 30);

            $scope.updateforms = function(){
                /*$scope.$apply(function() {
                    $scope.allForms = [];
                });*/
                $scope.getforms();
            };

            $scope.removeForm = function(form){

                var form = Restangular.one("form", form.id);
                form.remove();

                var index = 0;
                _.each($scope.allForms,function(value) {
                    if (value.id === form.id) {
                        $scope.allForms.splice(index, 1);
                    }
                    index = index + 1;
                });

                $scope.pop_removed();
            };

            // $scope.pt = SlidePanelContentData.getMeds($route.current.params.id);
        }]).controller('EditFormController', [
        '$rootScope','$scope', '$builder', '$validator', 'CreateForm',
        '$location','formtoaster','Restangular','JSTagsCollection',
         function($rootScope, $scope, $builder, $validator,CreateForm,$location,
                  formtoaster,Restangular,JSTagsCollection) {

           var eventupate;

           $scope.pop = function(){
                formtoaster.now.success('Your form was just updated.');
            };


          $scope.pop_error = function(){
                 formtoaster.now.error('There are errors in your submission. Likely you have forgot to fill out all required fields' +
                 ' You have to fix them before you can submit.');
          };


          $scope.tree_data =  [];

         $rootScope.$on('jsTags', function(event, args) {
              if(!!args.value)
               {
                     $scope.tagarray = [];
                     _.each(args.value.tags, function(value,key) {
                         $scope.tagarray.push(value.value);
                     });

               }
           });

          $rootScope.$on('adminformroledataupdated', function(event, args) {
                 if(args.data.length>=0)
                 {
                     $scope.formroles = args.data;
                 }
           });

          var forms = Restangular.all('form');

           $builder.removeAllObjects('formbuiltinforms');

           $builder.removeAllObjects('editform');

           CreateForm.builtinforms();

           $scope.addFormObject = function(form){
                for (var j = 0; j < form.formformbuilder.length; j++) {

                    $builder.addFormObject('editform', form.formformbuilder[j]);
                }
            };

            $scope.forminformation = CreateForm.builtinforminformation;

            $scope.formid = $location.path().split('/')[3];

            forms.getList().then(function(forms) {
                _.each(forms,function(value) {
                    if(value._id ===  $scope.formid) {
                       $scope.formroles = value.formroles;
                        $rootScope.$emit('adminformrolefetched', {
                            data:  value.formroles
                        });
                        $scope.tree_data =  value.formroles;
                        $scope.addFormObject(value);
                        $scope.formbuiltinvalue = {};
                        $scope.formbuiltinvalue[CreateForm.formnametextbox.id] = $scope.forminformation.formname(value.formbasicinformation);
                        $scope.formbuiltinvalue[CreateForm.formprogramtextbox.id] = $scope.forminformation.formprogram(value.formbasicinformation);
                        $scope.formbuiltinvalue[CreateForm.formdescriptionareatbox.id] = $scope.forminformation.formdescription(value.formbasicinformation);
                        $rootScope.$emit('programTextNeedUpdate', {
                            data: $scope.forminformation.formprogram(value.formbasicinformation)
                        });
                    }});
             });

             //$scope.form = $builder.forms['builtinforms'];
            $scope.formbuiltinforms = $builder.forms['formbuiltinforms'];
            $scope.form = $builder.forms['editform'];
            $scope.input = [];
            $scope.defaultValue = {};

            $scope.updateform = function(){
                //console.log('USERID: ' + $scope.global.user._id);
                return $validator.validate($scope, 'formbuiltinforms').success(function() {
                    Restangular.one('form/' + $scope.formid).get().then(function(form) {
                    form.formbasicinformation = $scope.input;
                    form.formformbuilder = $scope.form;
                    form.formcreator = $scope.global.user._id;
                    form.formroles = $scope.formroles;
                    form.save();
                });
                    $scope.pop();
                }).error(function() {
                    $scope.pop_error();
                });
            };

           $scope.roletags = [];
           return $scope.submit = function() {
               $scope.updateform();
          };

        }]);
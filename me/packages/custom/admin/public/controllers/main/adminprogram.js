/**
 * Created by hbzhang on 2/20/15.
 */
'use strict';

angular.module('mean.admin').controller('AdminProgramController', ['$location','$rootScope','$scope','Global','$http','CreateForm','CreateProgram','formtoaster','Restangular',
    function($location,$rootScope,$scope,Global,$http,CreateForm,CreateProgram,formtoaster,Restangular) {
        $scope.global = Global;
       /* $scope.formData = {
        programs: [
            {
                name: 'program-sub program- sub sub progam'
            }
        ]}; */

        $scope.addProgram = function(){
            $scope.formData.programs.push({});
        };

        $scope.removeProgram = function(program) {
            $scope.formData.programs.splice(
                $scope.formData.programs.indexOf(program), 1);
        };


        var programs = Restangular.all('program');

        $scope.getprograms = function() {
            $scope.allProgramnames = []; $scope.formallProgramnames = []; $scope.formData = {};
            programs.getList().then(function(programs) {
                $scope.allPrograms = programs;
                _.each(programs, function(value) {
                    _.each(value.name, function(singlevalue) {
                        var el = {'name': singlevalue.name};
                        //console.log(el);
                        $scope.allProgramnames.push(singlevalue.name);
                        $scope.formallProgramnames.push(el);
                    });
                });

                var el = {'programs' : $scope.formallProgramnames };
                $scope.formData =  el;

                $scope.allProgramnamesselectedOption = $scope.allProgramnames[0];
                $scope.inputText =  $scope.allProgramnamesselectedOption;
            });
        }();

        $scope.eventid = $location.path().split('/')[3];

        $scope.forminformation = CreateForm.builtinforminformation;

        // this seems to work to update the program dropdown list
        var forms = Restangular.all('form');
        forms.getList().then(function(forms) {
            _.each(forms,function(value) {
                if(value._id ===  $scope.eventid) {
                    console.log( $scope.forminformation.formprogram(value.formbasicinformation));
                    $scope.inputText =  $scope.forminformation.formprogram(value.formbasicinformation);
                }});
        });

        //update program drop down list, but not sure why it does not appear to work
        $rootScope.$on('programTextUpdate', function(event, args) {

            if(!!args.data)
            {
                $scope.inputText = args.data;
            }
        });

        $scope.$watch(
            'inputText',
            function( newValue, oldValue ) {
                //$scope.allProgramnamesselectedOption = newValue;
                //console.log(newValue);
                $rootScope.$broadcast('inputTextUpdated', {data: newValue, elementid:'programlist'});
            });

        $scope.validationFailed = function() {
            formtoaster.now.error('Your have to input program name');
        };

        $scope.submit = function() {
            var newProgram = {name: $scope.formData.programs,
                              user: Global.user._id
                             };
            programs.post(newProgram);

            $rootScope.$broadcast('ProrgamUpdated', {data: {}});


         /*programs.getList().then(function(program) {
                program.name =  $scope.formData.programs;
                program.users = Global.users._id;
                console.log(program);
                program.post();
            }); */

            formtoaster.now.info('Program was created and updated');
        };

        // $scope.pt = SlidePanelContentData.getMeds($route.current.params.id);
    }]);


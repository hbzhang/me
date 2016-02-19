/**
 * Created by hbzhang on 3/17/15.
 */
'use strict';

angular.module('mean.front').controller('MenuController', [
    '$location','$rootScope',
    '$scope','Global','$http','Program',
    'formtoaster','Restangular',
    function($location,$rootScope,$scope,Global,$http,Program,formtoaster,Restangular) {
        $scope.global = Global;

        $scope.rootprogram = $location.path().split('/')[3];

        var programs = Restangular.all('program');

        $scope.getprograms = function() {
            $scope.allPrograms = []; $scope.allProgramNames = []; $scope.secondaryPorgrams = []; var el;
            programs.getList().then(function(programs) {
                //$scope.allPrograms = programs;
                _.each(programs, function(value) {
                    _.each(value.name, function(singlevalue) {

                       $scope.programarray = Program.programarray(singlevalue.name, '-');

                        if(singlevalue.name.indexOf('-')!==-1) {
                            el = {'name': singlevalue.name.substr(0, singlevalue.name.indexOf('-')),
                                  'first_child':Program.get_first_child_program($scope.programarray,singlevalue.name)
                                 };
                            $scope.allProgramNames.push(singlevalue.name.substr(0, singlevalue.name.indexOf('-')));
                            $scope.allPrograms.push(el);

                        }
                        else {
                            el = {'name': singlevalue.name,
                                'first_child':Program.get_first_child_program($scope.programarray,singlevalue.name)
                            };
                            $scope.allProgramNames.push(singlevalue.name);
                            $scope.allPrograms.push(el);
                        }

                    });
                });

                //console.log($scope.allPrograms);
                //http://stackoverflow.com/questions/1069666/sorting-javascript-object-by-property-value
                $scope.allPrograms = $scope.allPrograms.filter(function(item, pos) {
                    return  $scope.allProgramNames.indexOf(item.name) == pos;
                });

                $scope.uniqueAllPrograms=  $scope.allPrograms.slice(0);

                $scope.uniqueAllPrograms.sort(
                    function(a,b){
                       // return $scope.uniqueAllPrograms[a]-$scope.uniqueAllPrograms[b]
                        var x = a.name.toLowerCase();
                        var y = b.name.toLowerCase();
                        return x < y ? -1 : x > y ? 1 : 0;

                    }
                );

            });
        };

        $scope.getprograms();


        //update program drop down list, but not sure why it does not appear to work
        $rootScope.$on('ProrgamUpdated', function(event, args) {

            $scope.getprograms();
        });


        // $scope.pt = SlidePanelContentData.getMeds($route.current.params.id);
    }]);


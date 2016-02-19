/**
 * Created by hbzhang on 3/19/15.
 */
angular.module('mean.front').controller('FrameMainPanelController', [
    '$location','$rootScope',
    '$scope','Global','$http','Program',
    'formtoaster','Restangular',
    function($location,$rootScope,$scope,Global,$http,Program,formtoaster,Restangular) {
        $scope.global = Global;
        $scope.package = {
            name: 'front'
        };

        var getrootprogram = function(){

            var program = $location.path().split('/')[3];

            var programarray = Program.programarray(program, '-');

            $scope.rootprogram = programarray[0] + '-' + programarray[1];

        };
        getrootprogram();

        $scope.displayedrootname = Program.rootprogram($scope.rootprogram);

        var programs = Restangular.all('program');

        $scope.getSecondaryPrograms = function(){
            $scope.secondaryPorgrams  = [];  $scope.programarray = [];
            programs.getList().then(function(programs) {

                _.each(programs, function(program) {

                    _.each(program.name, function(value) {

                        $scope.programarray = Program.programarray(value.name, '-');

                        $scope.parentProgram = Program.rootprogram(value.name);

                        if(value.name.indexOf('-')!==-1) {
                            //console.log(Program.rootprogram(value.name));

                            if ($scope.rootprogram.substr(0, $scope.rootprogram.indexOf('-')) === Program.rootprogram(value.name)){

                                var el = {
                                        'name': Program.specificchildprogram($scope.programarray,Program.rootprogram(value.name),1),
                                        'parent':$scope.parentProgram
                                };
                                $scope.secondaryPorgrams.push(el);

                            }
                        }

                    });

                });

            });

        };

        $scope.getSecondaryPrograms();


        // $scope.pt = SlidePanelContentData.getMeds($route.current.params.id);

    }]);

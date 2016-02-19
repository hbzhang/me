/**
 * Created by hbzhang on 4/2/15.
 */

angular.module('mean.front').controller('FrameSecondMainContentController', ['$scope','Global','Restangular','Program','$location',
    function($scope,Global,Restangular,Program,$location) {
        $scope.global = Global;
        $scope.package = {
            name: 'front'
        };

        $scope.rootprogram = $location.path().split('/')[3];

        var getprogramname = function(value){

            var programarray = Program.programarray(value, '-');

            return programarray[programarray.length-1];

        };


        var items = Restangular.all('item');

        $scope.getitems = function() {
            $scope.founditems = [];
            items.getList().then(function(items) {
                //$scope.allItems = [];
                _.each(items, function(value) {

                    if(value.itemprogam.name === $scope.rootprogram && value.itemcontrol.published ===true){

                        var el = {
                            rootprogram:$scope.rootprogram,
                            value:value,
                            name:getprogramname(value.itemprogam.name)
                        };
                        $scope.founditems.push(el);

                    }

                });

                console.log($scope.founditems);

            });
        }

        $scope.getitems();


        // $scope.pt = SlidePanelContentData.getMeds($route.current.params.id);

    }]);

/**
 * Created by hbzhang on 3/19/15.
 */
angular.module('mean.front').controller('FrameMainContentController', ['$scope','Global','Restangular','Program','$location',
    function($scope,Global,Restangular,Program,$location) {
        $scope.global = Global;
        // $scope.checked;
        $scope.package = {
            name: 'front'
        };

        var splitpath = $location.path().split('/')[3];

        $scope.wholename = splitpath;

        var getrootprogram = function(splitpath){

            var programarray = Program.programarray(splitpath, '-');

            $scope.rootprogram = programarray[0];

        };
        getrootprogram(splitpath);


        var getprogramname = function(value){

           var programarray = Program.programarray(value, '-');

           return programarray[programarray.length-1];

        };

        var getformname = function(value){

            var formname = '';

            _.map(value.itembasicinformation, function(item){
                _.map(item.data,function(data){

                    if(data.componentname==='formname' && data.visible === false){
                        formname = item.value;
                    }

                });
            });
             return formname;

        };


        var getformcoverphoto = function(value){

            var formcoverphoto = '';

            _.map(value.itembasicinformation, function(item){
                _.map(item.data,function(data){

                    if(data.componentname==='formcoverphotoupload'){
                        formcoverphoto = item.value;
                    }

                });
            });
            return formcoverphoto;

        };

        var items = Restangular.all('item');

        $scope.getitems = function() {
             $scope.founditems = [];  $scope.founditemnames = [];
            items.getList().then(function(items) {
                //$scope.allItems = [];
                _.each(items, function(value) {


                    if(Program.is_contains_program(getprogramname(value.itemprogam.name), getprogramname($scope.wholename)) && value.itemcontrol.published ===true){

                        var el = {
                            wholeprogram:$scope.wholename,
                            value:value,
                            name:getformname(value),
                            coverphoto:getformcoverphoto(value),
                            id:value._id
                                //getprogramname(value.itemprogam.name)
                        };
                        $scope.founditemnames.push(getformname(value));
                        $scope.founditems.push(el);

                    }
                    //console.log($scope.founditems.length);
                    /*   var iteminformation = {
                        'id': value._id,
                        'name': value.itemcreatedtime,
                        'programname': value.itemprogam.name
                    };

                    $scope.allItems.push(iteminformation); */

                });

                $scope.allItems = $scope.founditems.filter(function(item, pos) {
                    return  $scope.founditemnames.indexOf(item.name) == pos;
                });

               // console.log($scope.allItems);



            });
        }

        $scope.getitems();


        // $scope.pt = SlidePanelContentData.getMeds($route.current.params.id);

    }]);

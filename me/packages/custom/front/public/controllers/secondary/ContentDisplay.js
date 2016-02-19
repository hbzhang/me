/**
 * Created by hbzhang on 3/30/15.
 */
angular.module('mean.front').controller('ContentDisplayController', ['$scope','Global',
    'Restangular','Program','$location','$builder','$validator','formtoaster','$rootScope',
    function($scope,Global,Restangular,Program,$location,$builder,$validator,formtoaster,$rootScope) {
        $scope.global = Global;

        $scope.pop = function(){
            formtoaster.now.success('Your register was just submitted. You can find your submission in the results Tab');
        };

        $scope.pop_error = function(){
            formtoaster.now.error('There are errors in your submission. Likely you have forgot to fill out all required fields' +
            ' You have to fix them before you can submit.');
        };

        var getcontentID = function(){

            var program = $location.path().split('/')[3];

            var programarray = Program.programarray(program, '-');

            $scope.contentid = programarray[programarray.length-1];

            $rootScope.$broadcast('wholeprogramforform', {id:program});

        };
        getcontentID();

        $builder.removeAllObjects('registerform');

        $scope.input = [];

        $scope.addFormObject = function(form){
            //console.log(form);
            for (var j = 0; j < form.length; j++) {
                form[j].id = 'item' + j;
                $builder.addFormObject('registerform', form[j]);
            }
        };

        $scope.is_display_the_item = function(value){

            var do_not_display = true;

            _.map(value.data,function(data){

                    if(data.visible === false){
                        do_not_display = false;
                    }

                });
            return do_not_display;

        };

        var items = Restangular.all('item');

        $scope.getitems = function() {
            $scope.content = [];
            items.getList().then(function(items) {
                $scope.allItems = [];
                _.each(items, function(value) {
                    if(value._id ===  $scope.contentid ){
                       // console.log(value);
                       $scope.formid = value._id;
                        var el = {
                            valueid:value._id,
                            value:value
                        };
                        $scope.content.push(el);
                        $scope.addFormObject(value.itemformbuilder);
                    }

                    /*   var iteminformation = {
                     'id': value._id,
                     'name': value.itemcreatedtime,
                     'programname': value.itemprogam.name
                     };

                     $scope.allItems.push(iteminformation); */

                });

            });
        };

        $scope.getitems();

        $scope.form = $builder.forms['registerform'];
        $scope.input = [];
        $scope.defaultValue = {};

        var registers = Restangular.all('registration');

        $scope.saveregisteries = function() {

            return $validator.validate($scope, 'registerform').success(function() {
                var register = {};
                register.information = $scope.input;
                register.reasonforregister = $scope.formid;
                register.users = $scope.global.user._id;
                register.qrcode = [];
                registers.post(register);
                $scope.pop();
            }).error(function() {
                $scope.pop_error();
            });


        };
        // $scope.pt = SlidePanelContentData.getMeds($route.current.params.id);

    }]);

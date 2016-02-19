/**
 * Created by hbzhang on 4/13/15.
 */
angular.module('mean.front').controller('RegistrationEditController', ['$scope','Global',
    'Restangular','Program','$location','$builder','$validator','formtoaster',
    function($scope,Global,Restangular,Program,$location,$builder,$validator,formtoaster) {
      $scope.global = Global;

      $scope.pop = function(){
        formtoaster.now.success('Your registration result was just updated.');
      };

      var getRegistrationID = function(){

            var program = $location.path().split('/')[3];

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
                    //console.log(item.value);
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
                //console.log(register);
                register.information = $scope.input;
                register.reasonforregister = $scope.itemid;
                register.users = $scope.global.user._id;
                register.qrcode = [];
                register.save();
                $scope.pop();
            });
     };


}]);

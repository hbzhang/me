/**
 * Created by hbzhang on 10/26/14.
 */
/*
 app.factory('notificationFactory', function () {
 return {
 success: function (text) {
 toastr.success(text,"Success");
 },
 error: function (text) {
 toastr.error(text, "Error");
 }
 };
 });

 http://stackoverflow.com/questions/19651028/angularjs-reload-data-in-bootstrap-tabs
 http://www.objectpartners.com/2013/08/21/using-services-and-messages-to-share-data-between-controllers-in-angularjs/
 http://stackoverflow.com/questions/16703215/how-to-reload-or-re-render-the-entire-page-using-angularjs

 changeData().then(function() {
 $rootScope.$broadcast("importandDataChanged");
 });
 Controller that needs to update:

 $scope.$on("importandDataChanged", function() {
 // signal that data changed, lazy load when the tab is actually clicked
 $scope.importantData = null;
 });

 // let $scope.active be a flag that is true when the tab is active
 $scope.$watch("active", function(newvval) {
 if( newval && $scope.importantData === null ) {
 loadData();
 }
 });


 http://stackoverflow.com/questions/14379274/javascript-iterate-object/

//object array
 for (var prop in $scope.input) {
 if ($scope.input.hasOwnProperty(prop)) {
 // or if (Object.prototype.hasOwnProperty.call(obj,prop)) for safety...
 //alert("prop: " + prop + " value: " + $scope.input[prop])
 console.log($scope.input[prop]);
 //$scope.event = new Event();
 //event.prop = $scope.input(prop);

 var obj = { banana: 1425, orange: 1683};

 var fruits = _.map(obj, function(value, key){
 return { name : key, value : value };
 });

 console.log(Event);

 //Event.save(function(res) {});

 //$scope.event = new Event();

  var event_ = new Event.event_(
 {
 prop:$scope.input.hasOwnProperty(prop)
 }
 );

 event_.$save(function(res) {
 console.log(res);
 //data saved. do something here.
 });

}
}

 */

/**
 * Created by hbzhang on 11/13/14.
 */
angular.module('eventformbuilderhelper', ['angular-carousel','event']).factory('CustomizedComponent',['$resource', 'Event','$rootScope', function($resource,Event,$rootScope) {

    return {
        data: {},
        eventformtshirt:[
            {ID: 1, type: 'Youth Medium' },
            {ID: 2, type: 'Youth Large' },
            {ID: 3, type: 'Adult Small' },
            {ID: 4, type: 'Adult Medium' },
            {ID: 5, type: 'Adult Large' },
            {ID: 6, type: 'Adult XL' },
            {ID: 7, type: 'Adult XXL' },
            {ID: 8, type: 'Adult XXXL' }
        ],
        eventformwave:[
            {ID: 1, type: 'Stroller' },
            {ID: 2, type: 'Wheel Chair' },
            {ID: 3, type: 'Walk' },
            {ID: 4, type: 'Run' },
            {ID: 5, type: 'Competitive Run' }
        ]
    };

}]).controller('CustomizedEventFormComponentController', [ 'Global', 'Event', '$http', '$scope', '$timeout', 'CustomizedComponent', '$rootScope',
    function (Global, Event, $http, $scope, $timeout,CustomizedComponent,$rootScope) {
    /*$scope.swapData = function() {
     if ($scope.gridOpts.data === data1) {
     $scope.gridOpts.data = data2;
     }
     else {
     $scope.gridOpts.data = data1;
     }
     };*/


    var grid;

    $scope.waves = CustomizedComponent.eventformwave;
    $scope.shirtTypes = CustomizedComponent.eventformtshirt;
    $scope.myExternalScope = $scope;

    $scope.$on('ngGridEventFilter', function(evt){
        console.log("changed data ahaha: " + evt.targetScope.row.entity);  // the underlying data bound to the row
        // Detect changes and send entity to server
    });

    /*
     $scope.reset = function () {
     data1 = angular.copy(origdata1);
     data2 = angular.copy(origdata2);
     $scope.gridOpts.data = data1;
     }
     */

    $scope.removeFirstRow = function() {
        //if($scope.gridOpts.data.length > 0){
        $scope.gridOptions.data.pop();//splice(0,1);
        Event.QRcode.pop();//splice(0,1);
        //console.log( Event.QRcode.length);
        //}
    };

    $scope.addData = function(event) {
        //console.log( Event.QRcode.length + ':' + $scope.gridOptions.data.length);
        var n = $scope.gridOptions.data.length + 1;
        var registereddata = {
            "name": "Double Click",// + n,
            "email": "Double Click",// + n,
            "shirt": "Medium"// + n
        };
        $scope.gridOptions.data.push(registereddata);
        Event.customizeddata = $scope.gridOptions.data;
        $rootScope.$broadcast('inputTextUpdated', {data: $scope.gridOptions.data, elementid:'eventcomponent'});
        event = JSON.parse(event);

        var eventuserinformation = {
            eventid: event._id,
            customizeddata:registereddata,
            username: Global.user.username
        };
        Event.QRcode.push(eventuserinformation);

        //console.log(eventuserinformation);//typeof(event));

        //console.log("eventuserinformation: " + eventuserinformation.username);

        /*$scope.gridOptions.data.map(function(item) {

        })*/

    };

    $scope.$on('saveeventfinished', function(event, args) {
        //$scope.message = 'ONE: ' + args.message;
        //console.log(args);
        $scope.gridOptions.data = [];
        Event.QRcode = [];
    });

    //var origdata1 = angular.copy(data1);

    $scope.gridOptions = {
        //data: {},
        /*enableRowSelection: false,
         enableCellEditOnFocus: true,
         multiSelect: false,
         enableSorting: true,*/

        enableSorting: false,
        enableFiltering: false,
        enableCellEditOnFocus: true,

        // enableFiltering: true,
        /* columnDefs: [
         { field: 'name', displayName: 'Name', enableCellEditOnFocus: true
         },
         { field: 'email', displayName: 'Email', enableCellEdit: true },
         { field: 'shirt', displayName: 'Shirt', enableCellEditOnFocus: true,
         editableCellTemplate: $scope.cellSelectEditableTemplate,
         cellFilter: 'LanguageMap'},
         { field: 'Wave', editType: 'dropdown', enableCellEdit: true,
         editableCellTemplate: 'product/views/templates/formbuilder/event/customizedformhelper.html' }
         ],*/
        columnDefs: [
            { field: 'name',
                sort: {
                    direction: 'desc',
                    priority: 1
                }
            },
            { field: 'email',
                sort: {
                    direction: 'desc',
                    priority: 2
                }
            },
            { field: 'shirt', editType: 'dropdown', enableCellEdit: true,
                editableCellTemplate: 'product/views/templates/formbuilder/event/tshirtformhelper.html',
                cellFilter : 'shirtFilter'}
          /*  { field: 'wave', editType: 'dropdown', enableCellEdit: true,
                editableCellTemplate: 'product/views/templates/formbuilder/event/waveformhelper.html',
                cellFilter : 'waveFilter'} */
        ],
        onRegisterApi: function( gridApi ) {
            grid = gridApi.grid;
        }

    };

    $scope.gridOptions.data = [];
    //Event.QRcode = [];

    /*
     $http.get('https://rawgit.com/angular-ui/ui-grid.info/gh-pages/data/100.json')
     .success(function(data) {
     $scope.gridOptions.data = data;
     console.log(data);
     });
     */

//http://plnkr.co/edit/VABAEu?p=previews
}]).directive('ngBlur', function () {
    return function (scope, elem, attrs) {
        elem.bind('blur', function () {
            scope.$apply(attrs.ngBlur);
        });
    };
}).filter('shirtFilter', function(CustomizedComponent) {

    return function(input) {
        //console.log(input)
        var shirtMatched = CustomizedComponent.eventformtshirt.filter(function(shirt) {
            return shirt.ID == input;
        });

        if (shirtMatched.length == 1)
            return shirtMatched[0].type;
        else
            return 'Medium'


        return text;
    }
}).filter('waveFilter', function(CustomizedComponent) {

    return function(input) {
        //console.log(input)
        var waveMatched = CustomizedComponent.eventformwave.filter(function(wave) {
            return wave.ID == input;
        });

        if (waveMatched.length == 1)
            return waveMatched[0].type;
        else
            return 'Run'

        return text;
    }
});




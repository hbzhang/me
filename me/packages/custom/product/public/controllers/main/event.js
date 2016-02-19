/**
 * Created by hbzhang on 10/29/14.
 */

angular.module('event', ['abt_nav_tree','monospaced.qrcode', 'ui.grid','ui.grid.edit',
    'toaster','builder', 'builder.components', 'validator.rules',
    'mean.product','nvd3ChartDirectives']).run([
    '$builder', function($builder) {

        /*return $builder.registerComponent('name', {
            group: 'Default',
            label: 'Name',
            required: false,
            arrayToText: true,
            template: "<div class=\"form-group\">\n    <label for=\"{{formName+index}}\" class=\"col-md-4 control-label\" ng-class=\"{'fb-required':required}\">{{label}}</label>\n    <div class=\"col-md-8\">\n        <input type='hidden' ng-model=\"inputText\" validator-required=\"{{required}}\" validator-group=\"{{formName}}\"/>\n        <div class=\"col-sm-6\" style=\"padding-left: 0;\">\n            <input type=\"text\"\n                ng-model=\"inputArray[0]\"\n                class=\"form-control\" id=\"{{formName+index}}-0\"/>\n            <p class='help-block'>First name</p>\n        </div>\n        <div class=\"col-sm-6\" style=\"padding-left: 0;\">\n            <input type=\"text\"\n                ng-model=\"inputArray[1]\"\n                class=\"form-control\" id=\"{{formName+index}}-1\"/>\n            <p class='help-block'>Last name</p>\n        </div>\n    </div>\n</div>",
            popoverTemplate: "<form>\n    <div class=\"form-group\">\n        <label class='control-label'>Label</label>\n        <input type='text' ng-model=\"label\" validator=\"[required]\" class='form-control'/>\n    </div>\n    <div class=\"checkbox\">\n        <label>\n            <input type='checkbox' ng-model=\"required\" />\n            Required\n        </label>\n    </div>\n\n    <hr/>\n    <div class='form-group'>\n        <input type='submit' ng-click=\"popover.save($event)\" class='btn btn-primary' value='Save'/>\n        <input type='button' ng-click=\"popover.cancel($event)\" class='btn btn-default' value='Cancel'/>\n        <input type='button' ng-click=\"popover.remove($event)\" class='btn btn-danger' value='Delete'/>\n    </div>\n</form>"
        });*/
    }
]).config(['$locationProvider', '$sceProvider', '$stateProvider',
        function ($locationProvider, $sceProvider, $stateProvider) {
            $sceProvider.enabled(false);
            //$locationProvider.html5Mode(true);

 }]).factory('Event',['$resource', '$builder','$rootScope', function($resource,$builder,$rootScope) {

    var eventupdated = {};

    var builtinforminformation = {

         eventname: function(event){
//http://stackoverflow.com/questions/7364150/find-object-by-id-in-array-of-javascript-objects
             var obj = _.find(event, function(obj) { return obj.id == 'eventnametextbox' });
             return obj.value;
         },
         eventlocation: function(event){
             var obj = _.find(event, function(obj) { return obj.id == 'eventlocationtextbox' });
             return obj.value;
         },
         eventdate: function(event){
             //console.log(event);
             var obj = _.find(event, function(obj) { return obj.id == 'eventdatetextbox' });
             return obj.value;
         },
         eventdescription: function(event){
             // console.log(event);
             var obj = _.find(event, function(obj) { return obj.id == 'eventddescriptionareatbox' });
             return obj.value;
         }
     };

    var addbuiltinforms = (function() {

        this.eventnametextbox = $builder.addFormObject('builtinforms', {
            id: 'eventnametextbox',
            component: 'textInput',
            label: 'Event Name',
            description: 'Event name',
            placeholder: 'Event name',
            required: true,
            editable: false
        });

       this.eventlocationtextbox = $builder.addFormObject('builtinforms', {
                id: 'eventlocationtextbox',
                component: 'textInput',
                label: 'Event Location',
                description: 'Event Location',
                placeholder: 'Event Location',
                required: true,
                editable: false
        });

       this.eventdatetextbox = $builder.addFormObject('builtinforms', {
                id: 'eventdatetextbox',
                component: 'textInput',
                label: 'Event Date',
                description: 'Event Date',
                placeholder: 'Event Date',
                required: true,
                editable: false
        });

       this.eventddescriptionareatbox = $builder.addFormObject('builtinforms', {
            id: 'eventddescriptionareatbox',
            component: 'eventdescription',
            label: 'Event Description',
            description: 'Event Description',
            placeholder: 'Event Description',
            required: false,
            editable: false
        });

        return this;

    });

    //http://www.objectpartners.com/2013/08/21/using-services-and-messages-to-share-data-between-controllers-in-angularjs/
    eventupdated.broadcastChange = function() {
        $rootScope.$broadcast("eventupdated");
        console.log('broadcast it!')
    };
    return {
        event: $resource('event/:eventID', {eventID:'@id'},{update: {method: 'PUT'}}, {query: {method: 'GET', params:{}, isArray: true}}),
        register: $resource('/registration/:id', {id:'@id'},{update: {method: 'PUT'}}, {query: {method: 'GET', params:{}, isArray: true}}),
        builtinforms:addbuiltinforms,
        builtinforminformation: builtinforminformation,
        updatedevent: {}, //event updated
        broadcastChange: eventupdated.broadcastChange, //it is not used for now
        customizeddata:{}, //when we make a customized widget, we need to update the data.
        QRcode: [], //this is the registermore callback function
        RegisteredQRcode:[]
    };

}]).controller('EventEditController', [
    '$scope', '$builder', '$validator', 'Event', '$location','toaster', function($scope, $builder, $validator, Event,$location,toaster) {

        var eventupate;

        $scope.pop = function(){
            toaster.pop('success', "", 'The event was just modified', 4500, 'trustedHtml', 'goToLink');
        };

        $builder.removeAllObjects('builtinforms');

        $builder.removeAllObjects('eventedit');

        Event.builtinforms();

        $scope.addFormObject = function(event){

            for (j = 0; j < event.eventformbuilder.length; j++) {
                //console.log(j);
                $builder.addFormObject('eventedit', event.eventformbuilder[j]);
            }

            /* Object.keys(events).forEach(function(k, i) {
             //  console.log(events[k]);
             }); */


            /*for (i = 0; i< events.length; i++) {
                var event = events[i];
                //console.log(i);

                for (j = 0; j < event.eventformbuilder.length; j++) {
                    //console.log(event.eventformbuilder[j]);
                    $builder.addFormObject('eventedit', event.eventformbuilder[j]);
                }

            } */


            /*for (var prop in $scope.eventformbuilder) {

             }*/
        };

        $scope.eventinformation = Event.builtinforminformation;

        $scope.eventid = $location.path().split('/')[3];

        $scope.allEvents = function() {
            Event.event.query(function(events) {
                $scope.events = events;
                this.events =  $scope.events;
                for (i = 0; i<  $scope.events .length; i++) {
                    var event = events[i];
                    //console.log(event._id);
                    if (event._id === $scope.eventid ) {
                        //$builder.removeAllObjects('eventedit');
                        eventupate = event;
                        $scope.addFormObject(event);
                        $scope.evenditbuildinformvalue = {};
                        $scope.evenditbuildinformvalue[Event.eventnametextbox.id] = $scope.eventinformation.eventname(event.eventbasicinformation);
                        $scope.evenditbuildinformvalue[Event.eventlocationtextbox.id] = $scope.eventinformation.eventlocation(event.eventbasicinformation);
                        $scope.evenditbuildinformvalue[Event.eventdatetextbox.id] = $scope.eventinformation.eventdate(event.eventbasicinformation);
                        $scope.evenditbuildinformvalue[Event.eventddescriptionareatbox.id] = $scope.eventinformation.eventdescription(event.eventbasicinformation);
                   }
               }

            });

        }();

      //$scope.form = $builder.forms['builtinforms'];
        $scope.eventbuiltinforms = $builder.forms['builtinforms'];
        $scope.form = $builder.forms['eventedit'];
        $scope.input = [];
        $scope.defaultValue = {};


        $scope.updatevent = function(){
           console.log('USERID: ' + $scope.global.user._id);
           eventupate.eventbasicinformation = $scope.input;
           eventupate.eventformbuilder =  $scope.form;
           eventupate.eventcreator = $scope.global.user._id;
           eventupate.$update({eventID:eventupate._id}, function(res) {
               Event.broadcastChange();
               Event.updatedevent = eventupate;
               //console.log(Event.updatedevent);
           });

           /* for (var i = 0, l = $scope.input.length; i < l; i++) {
                var obj = $scope.input[i];

            } */

        };

        return $scope.submit = function() {
            return $validator.validate($scope, 'default').success(function() {
                $scope.updatevent();
                $scope.pop();
                return console.log('success');
            }).error(function() {
                return console.log('error');
            });
        };

    }]).controller('EventFormBuilderController', [
    '$scope', '$builder', '$validator', 'Event', 'toaster', function($scope, $builder, $validator, Event,toaster) {

        $scope.pop = function(){
            toaster.pop('success', "", 'The event was just created', 4500, 'trustedHtml', 'goToLink');
        };

        $builder.removeAllObjects('builtinforms');

        $builder.removeAllObjects('event');

        $scope.saveevent = function(){
            //console.log('USERID: ' + $scope.global.user._id);
            //console.log(Event);
            var event = new Event.event();
            event.eventbasicinformation = $scope.input;
            event.eventformbuilder =  $scope.form;
            event.eventcreator = $scope.global.user._id;
            event.$save();

           /* for (var i = 0, l = $scope.input.length; i < l; i++) {
                var obj = $scope.input[i];

            } */

        };

        /* $builder.addFormObject('simple', {
             component: 'sampleInput'
         }); */
        Event.builtinforms();
        $scope.eventbuiltinforms = $builder.forms['builtinforms'];
        $scope.form = $builder.forms['event'];
        $scope.input = [];
        $scope.defaultValue = {};
       // $scope.defaultValue[textbox.id] = 'default value';
       // $scope.defaultValue[checkbox.id] = [true, true];
        return $scope.submit = function() {
            return $validator.validate($scope, 'default').success(function() {
               $scope.saveevent();
               $scope.pop();
               return console.log('success');
            }).error(function() {
                return console.log('error');
            });
        };
    }
]).controller('EventListController', [
    '$scope', '$builder', '$validator', 'Event', 'toaster',function($scope, $builder, $validator, Event, toaster) {

        $scope.allEvents = function () {
            Event.event.query(function (events) {
                $scope.events = events;
                this.events = $scope.events;
                //console.log(Event);
            });
        };

        $scope.reloadAllEvents= function(){
            $scope.allEvents();
        };

        $scope.removeEvent = function(event){

            Event.event.delete({eventID:event._id}, function(c) {
                for (var i = 0; i < $scope.events.length; i += 1) {
                    if ($scope.events[i]._id === event._id) {
                        $scope.events.splice(i, 1);
                    }
                }
            });
        };

        $scope.eventinformation = Event.builtinforminformation;

}]).controller('EventRegisterController', [
   'Global','$rootScope', '$scope', '$builder', '$validator', 'Event', 'toaster',function(Global,$rootScope,$scope, $builder, $validator, Event, toaster) {

        var userinfor = {};
        var username = Global.user.username;

        $scope.authenticated = Global.authenticated;
        $scope.user = Global.user;

        $scope.refreshQRcode = false;
        $scope.event = {};
        $scope.showQRcode = {};
        $scope.showQRcode.id = [];
        Event.QRcode = [];

        $scope.pop = function(){
            toaster.pop('success', "Congratulations!", 'The event application was just submited', 4500, 'trustedHtml', 'goToLink');
        };
        $scope.popfailed = function(){
            toaster.pop('failed', "Note!", 'you have already registered for yourself, but you can register for your affiliates.', 4500, 'trustedHtml', 'goToLink');
        };

        $scope.$on("eventupdated", function() {
            console.log('I got broadcast');
        });

        $scope.eventinformation = Event.builtinforminformation;

        // we need to update the event when the event is edited
        $scope.$watch(Event.updatedevent, function() {

            if($scope.events )
            for (i = 0; i<  $scope.events.length; i++) {
                var event = events[i];
                //console.log(event._id);
                if (event._id === Event.updatedevent.eventid ) {
                    event = Event.updatedevent;
                 }
            }

        });

        //$scope.global = Global;
        //$scope.forms = ['one', 'two', 'three', 'four'];

        $scope.addFormObject = function(events){
            //console.log(events);
            /* Object.keys(events).forEach(function(k, i) {
                   //  console.log(events[k]);
             }); */
            for (i = 0; i< events.length; i++) {
                var event = events[i];
                //console.log(i);
                $scope.formname = $scope.eventinformation.eventname(event.eventbasicinformation); //'eventregister' + i;
                $builder.removeAllObjects($scope.formname);
                for (j = 0; j < event.eventformbuilder.length; j++)
                    $builder.addFormObject($scope.formname, event.eventformbuilder[j]);

            }
            /*for (var prop in $scope.eventformbuilder) {

             }*/
        };

        $scope.allEvents = function() {
            Event.event.query(function(events) {
               $scope.events = events;
               this.events =  $scope.events;
               $scope.addFormObject($scope.events);

            });
        }();

        $scope.allregisteries = function() {
            var eventuserinformation = {},eventid;
            Event.RegisteredQRcode = [];
            Event.register.query(function(registeries) {
                $scope.registeries = registeries;
                this.registeries =  $scope.registeries;
                registeries.map(function(item){
                    eventid = item.reasonforregister;
                    item.qrcode.map(function(QRitem) {
                        if(QRitem.username === Global.user.username) {
                            console.log(QRitem.username + " " + $scope.global.user.username);
                            //eventuserinformation= eventid+ '-'+ username;
                            eventuserinformation = {
                                eventid: eventid,
                                username: Global.user.username
                            };
                            Event.RegisteredQRcode.push(eventuserinformation);
                            $scope.showQRcode.id.push(eventuserinformation); //item.reasonforregister
                         }
                    });


                });

                if($scope.refreshQRcode){
                    $scope.refreshQRcode = false;
                    $rootScope.$broadcast('eventinformationrefresh', {event: $scope.event});
                    $scope.event = {};
                }

            });
        };

        var loadAllregisteries = (function() {
            $scope.allregisteries();
        })();

        $scope.registered = function(event) {
            var registered = false;
            $scope.showQRcode.id.map(function(item){
                //console.log(item.eventid +':' + event._id + '----' +  item.username +':' + $scope.global.user.username);
                if (item.eventid ===  event._id && item.username === Global.user.username)
                    registered =  true;
            });
            return registered;
        };

        $scope.isregistered = function(registered){
            var isregistered = false;
            //console.log(registered);
            if(!!registered)
            registered.map(function(item){
                //console.log(item.users.username + ' ' + $scope.user.username);
                //console.log(item)
                if(item.users) {
                    if (item.users.username === $scope.user.username)
                        isregistered = true;
                }
            });
            return isregistered;
        };

        $scope.saveregisteries = function(id){
            //console.log('USERID: ' + $scope.global.user._id);
            console.log($scope.input);
            $scope.user = Global.user;
            Event.register.query({ id: id }, function(registered) {

                if(!$scope.isregistered(registered)) {  //only save owner's qr code given the owner is not able to be found in the database
                    console.log("save owner's QR code");
                    userinfor = {eventid: id, username: $scope.global.user.username};
                    Event.QRcode.push(userinfor);
                }
                if(Event.QRcode.length ===0){
                    $scope.popfailed();
                    return;
                }
                $scope.input.push(Event.customizeddata); //when we make a customized widget, we need to update the data.
                var register = new Event.register();
                register.users = $scope.global.user._id;
                register.information = $scope.input;
                register.reasonforregister = id;
                register.qrcode = Event.QRcode;
                register.$save(function(res) {
                    //$scope.showQRcode.id.push(id);
                    //http://stackoverflow.com/questions/9293423/can-one-controller-call-another
                    //$scope.$broadcast('QRcodeupdated', Event.QRcode);
                    Event.QRcode = [];
                    $rootScope.$broadcast('saveeventfinished', {eventid: id});
                }, function (error) {
                    console.log("error");
                });
                if(!$scope.isregistered(registered))
                    $scope.pop();
                else
                    $scope.popfailed();

               });

        };

        /*   $builder.addFormObject('simple', {
            component: 'sampleInput'
        }); */

        $scope.refresh = function(event){
            $scope.event = event;
            $scope.refreshQRcode = true;
            $scope.allregisteries();
        };

        $scope.eventbuiltinforms = $builder.forms['builtinforms'];
        $scope.form = $builder.forms['event'];
        $scope.input = [];
        $scope.defaultValue = {};
        $scope.formSubmit = {
            required: '',
            regexp: '',
            http: ''
        };
        // $scope.defaultValue[textbox.id] = 'default value';
        // $scope.defaultValue[checkbox.id] = [true, true];
        return $scope.submit = function(id) {
            //console.log($scope);
            return $validator.validate($scope, 'formSubmit').success(function() {
                $scope.saveregisteries(id);
                //return console.log('success');
            }).error(function() {
                return console.log('error');
            });
        };

    }
]).controller('EventChartController', [
    '$scope', 'Event', function($scope, Event) {

        $scope.exampleData = [
            { key: "One", y: 5 },
            { key: "Two", y: 2 },
            { key: "Three", y: 9 },
            { key: "Four", y: 7 },
            { key: "Five", y: 4 },
            { key: "Six", y: 3 },
            { key: "Seven", y: 9 }

        ];

        $scope.noDataData = [];


        $scope.xFunction = function () {
            return function (d) {
                return d.key;
            };
        };

        $scope.yFunction = function () {
            return function (d) {
                return d.y;
            };
        };

        var colorArray = ['#000000', '#660000', '#CC0000', '#FF6666', '#FF3333', '#FF6666', '#FFE6E6'];
        $scope.colorFunction = function () {
            return function (d, i) {
                return colorArray[i];
            };
        };

        $scope.descriptionFunction = function () {
            return function (d) {
                return d.key;
            }
        };


        $scope.toolTipContentFunction = function () {
            return function (key, x, y, e, graph) {
                return  'Super New Tooltip' +
                    '<h1>' + key + '</h1>' +
                    '<p>' + y + ' at ' + x + '</p>'
            }
        };


}]).controller('EventCarouselController', ['Event', '$scope', function (Event, $scope) {

    $scope.myInterval = 5000;
    $scope.slides = [];
    $scope.registeredpeople = [];
    $scope.slidesbyevents = [];

    $scope.addSlide = function(item) {
        //var newWidth = 600 + slides.length + 1;
        $scope.slides.push({
            data: item,
            url:item.username +".com",
            image: item,
            text: ''
        });
    };

   //$scope.slidesbyevents = [];
   //var username =  Event.QRcode[Event.QRcode.length - 1].username;

   $scope.getslidedata = function(event){
      //$scope.event = event;
      //console.log("event id:" +  event._id);
      $scope.slidesbyevents = _.filter($scope.registeredpeople, function(slide){
            //  console.log("slide url:" +  slide.url);
           return slide.eventid === event._id;

          }
      );
      $scope.registeredpeople = [];
       //console.log("event id:" +  event._id);
   };

    $scope.$on('QRcodeupdated', function(event, args) {
        //console.log('QRcodeupdated');
    });

    /* $scope.getqrcode = function(){
          $scope.qrcodehttp = 'http://' + username + '.com' ;
      };
   */

    $scope.QRgen = function () {
        var index = 0;
        $scope.addSlide(Event.RegisteredQRcode[0]);
        Event.RegisteredQRcode.map(function(item){
            //console.log(item);
            $scope.registeredpeople.push(item);
        });

        Event.RegisteredQRcode = [];
    };

    $scope.QRgen();

    $scope.$on('eventinformationrefresh', function(event, args) {
        //$scope.message = 'ONE: ' + args.message;
        $scope.slides = [];
        $scope.slidesbyevents = [];
        $scope.QRgen();
        $scope.getslidedata(args.event);

    });

}]).filter('unsafe', function($sce) { return $sce.trustAsHtml; });




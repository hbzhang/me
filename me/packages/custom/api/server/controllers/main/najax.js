/**
 * Created by hbzhang on 10/5/15.
 */

//http://stackoverflow.com/questions/26523093/sync-control-flow-using-nodejs-async-waterfall-each-and-mysql

'use strict';

var najax = require('najax');
//var _ = require('lodash');
var async = require('async');
//var Agenda = require('agenda');
var schedule = require('node-schedule');


exports.create_new_versus = function(req, res) {

    najax({
        url:'http://localhost:9999/users',
        method:'POST',
        data:{role:'admin',passport:'905400231',fname:'test hongbo',lname:'test zhang'}
    }).
        success(
        function(resp){
            console.log('add suessful');
            res.jsonp(resp);
        }
    )
        .error(
        function(err){
            console.log('failed');
            return res.jsonp(500, {
                error: 'Cannot update versus'
            });
        }
    );

};


//var json = JSON.parse(resp);//JSON.stringify(eval("(" + resp + ")"));

/*async.map(json, function iterator(model) {
 console.log(model.id);
 make_update_versus(model.id);

 });*/
// _.each(json, function iterator(model) {
//     make_update_versus(model.id);
// async.setImmediate(function (model) {
//});
// });


/* _.each(json, function(model){
 //console.log(model.techid);

 get_notcheckedin_id_in_versus(model.techid);

 // console.log(_.size(json));

 for(var key in model){
 // check also if property is not inherited from prototype
 if (myObject.options.hasOwnProperty(key)) {
 var value = model[key];
 }
 }

 }); */


//res.jsonp(response);


/*var make_update_versus = function(id) {

    var condition = '/'+ id;

    var url = 'http://128.173.128.195:9999/people'+condition;

    //console.log(url);

    najax({
         url:url,
         method:'put',
         data:{eligible:1}
        }).
        success(
            function(resp){
                //console.log(resp);
                console.log('add suessful');
            }
        )
        .error(
            function(err){
                console.log('failed to make real update to versus');
            }
        );

}; */


var all_notcheckedin_in_signup = function(req, res) {

    //var result = [];

    var response = {sucessful:'ajax signup not checked in read finished'};

    var eachCounter = 0;

    najax({
        url:'http://aquaman.recsports.vt.edu:6901/registrationdetails',
        method:'get'}
       ).success(
        function(resp){

            var json = JSON.parse(resp);//JSON.stringify(eval("(" + resp + ")"));

            //console.log(json);

            json = json.slice(1, 30);

            //console.log(json);

            async.eachSeries(json, function(model,eachcallback) {

                var condition = '?where={passport:"'+model.techid+'"}';

                var url = 'http://128.173.128.195:9999/people'+condition;

                async.waterfall([
                        function(callback){

                            najax({
                                url: url,
                                method: 'get'
                            }).
                                success(
                                function (resp) {
                                    callback(null, resp);
                                }).error(
                                    function(err){
                                    console.log(url);
                                    console.log('failed to get  persom from versus');
                                    callback(null, resp);
                               });


                        },
                        function(resp, callback) {
                            // arg1 is equals 'a' and arg2 is 'b'
                            // Code c

                            var json = JSON.parse(resp);//JSON.stringify(eval("(" + resp + ")"));

                            async.eachSeries(json, function (model, eachcallback1) {

                                    var url = 'http://128.173.128.195:9999/people/' + model.id;

                                    najax({
                                        url: url,
                                        method: 'put',
                                        data: {eligible: 1}
                                    }).
                                        success(
                                        function (resp) {
                                            //console.log(resp);
                                            console.log('add sucessful');
                                            eachcallback1();
                                        }
                                    )
                                        .error(
                                        function (err) {
                                            console.log('failed to make real update to versus');
                                            eachcallback1();
                                        }
                                    );

                                }, function done() {
                                callback();
                            });

                        }

                    ], function (err, result) {
                        eachCounter = eachCounter + 1;
                        //console.log('waterfall done');
                        eachcallback();

                    }
             );

            //callback();

            },function(err){
                // if any of the file processing produced an error, err would equal that error
                if( err ) {
                    // One of the iterations produced an error.
                    // All processing will now stop.
                    console.log('error to fetch data from signup' + err);
                } else {
                    console.log(eachCounter + ' records has been updated');
                    console.log(response);
                }
            });


        }

    )
        .error(
        function(err){
            console.log('failed');
            return res.jsonp(500, {
                error: 'Cannot list all not checkedin signup '
            });
        }
    );



};

exports.update_versus = function(req, res) {

    /*var agenda = new Agenda({db: { address: 'localhost:27017/intramuralsignupintegration'}});

    agenda.define('update versus from signup', function(job) {
        all_notcheckedin_in_signup(req, res);
    });

    agenda.every('3 minutes', 'update versus from signup');

    agenda.start();*/



    schedule.scheduleJob('*/5 * * * *', function(){
        all_notcheckedin_in_signup(req, res);
    });

};





exports.item = function(req, res, next, id) {

};



//najax('http://www.google.com', { type:'POST' }, function(html){ console.log(html); }); // "awesome"
//najax({ url:'http://www.google.com', type:'POST' }).success(function(resp){}).error(function(err){}); // "awesome"

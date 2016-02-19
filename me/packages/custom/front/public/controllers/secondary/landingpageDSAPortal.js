/**
 * Created by hbzhang on 1/19/15.
 */
'use strict';

angular.module('mean.front').controller('landingpageDSAPortalController',[
    '$scope','FrontPageDataHelper',
    'angularLoad',
    function ($scope, FrontPageDataHelper,
              angularLoad) {
    $scope.myInterval = 5000;
    var slides = $scope.slides = [];
    $scope.addSlide = function() {
        var newWidth = 600 + slides.length + 1;
        slides.push({
            image: 'http://placekitten.com/' + newWidth + '/300',
            text: ['More','Extra','Lots of','Surplus'][slides.length % 4] + ' ' +
            ['Cats', 'Kittys', 'Felines', 'Cutes'][slides.length % 4]
        });
    };
    var a = [ 1,2,3,4];
    a.map(function(item) {
        $scope.addSlide();
    });

/*
   angularLoad.loadCSS('bower_components/chart/responsive/css/skeleton/custom.css').then(function() {
            // Script loaded succesfully.
            // We can now start using the functions from someplugin.js
        }).catch(function() {
            // There was some error loading the script. Meh
    });

    angularLoad.loadCSS('bower_components/chart/responsive/css/skeleton/custom_1.css').then(function() {
            // Script loaded succesfully.
            // We can now start using the functions from someplugin.js
    }).catch(function() {
            // There was some error loading the script. Meh
    });


    angularLoad.loadCSS('bower_components/chart/responsive/css/skeleton/normalize.css').then(function() {
            // Script loaded succesfully.
            // We can now start using the functions from someplugin.js
        }).catch(function() {
            // There was some error loading the script. Meh
    });

    angularLoad.loadCSS('bower_components/chart/responsive/css/skeleton/skeleton.css').then(function() {
            // Script loaded succesfully.
            // We can now start using the functions from someplugin.js
        }).catch(function() {
            // There was some error loading the script. Meh
    });

*/

    $scope.get_sharepoint_data = function(parentname) {

        $scope.sharepoint = [];

        var data = {
            parent:parentname
        }

        //console.log(data);

        _.map(FrontPageDataHelper.sharepoint,function(item){

            if(item.data.parent===''){
                if(data.parent === ''){
                    $scope.sharepoint.push(item);
                }
                else {
                    $scope.sharepoint.push(FrontPageDataHelper.back_button);
                    _.map(item.children,function(child){
                        if(child.data.parent === data.parent)
                            $scope.sharepoint.push(child);

                    });

                }


            }


        });

    }

    $scope.get_sharepoint_data('');

    $scope.get_DSATools_data = function(parentname) {

            $scope.DSATools = [];
            var data = {
                parent:parentname
            }

            //console.log(data);
            _.map(FrontPageDataHelper.DSATools,function(item){

                if(item.data.parent===''){
                    if(data.parent === ''){
                        $scope.DSATools.push(item);
                    }
                    else {
                        $scope.DSATools.push(FrontPageDataHelper.back_button);
                        _.map(item.children,function(child){
                            if(child.data.parent === data.parent)
                                $scope.DSATools.push(child);
                        });

                    }

                }


            });

    }

    $scope.get_DSATools_data('');

    $scope.currentdate = new Date().toJSON().slice(0,10);


    $scope.photos = [
            {id: 'p1', 'title': '', src: "http://lorempixel.com/450/400/city"},
            {id: 'p2', 'title': '', src: "http://lorempixel.com/450/400/city"},
            {id: 'p3', 'title': '', src: "http://lorempixel.com/450/400/city"},
        {id: 'p4', 'title': '', src: "http://lorempixel.com/450/400/city"},
        {id: 'p5', 'title': '', src: "http://lorempixel.com/450/400/city"}



    ];


}]).controller('NavigationController', function ($scope) {

        $scope.tree = [{
            name: "States",
            link: "#",
            subtree: [{
                name: "state 1",
                link: "state1"
            },{
                name: "state 2",
                link: "state2"
            }]
        }, {
            name: "No states",
            link: "#",
            subtree: [{
                name: "no state connected",
                link: "#"
            }]
        }, {
            name: "divider",
            link: "#"

        }, {
            name: "State has not been set up",
            link: "#"
        }, {
            name: "divider",
            link: "#"
        }, {
            name: "Here again no state set up",
            link: "#"
        }];
});
'use strict';

angular.module('mean.front').factory('Program',['$resource','$rootScope', function($resource,$rootScope) {


    var rootprogram = function(str){

        return str.substr(0,  str.indexOf('-'));
    };

    var get_first_child_program = function(programarray,str){

        var first_child, index = 0, foundparent = false;
        //console.log(programarray);
        _.each(programarray, function (value) {
            //console.log(value);
            if (value === str.substr(0,  str.indexOf('-'))) {
                foundparent = true;
            }
            if (foundparent && index == 1) {
                first_child = value;
            }
            if (foundparent)
                index = index + 1;
        });
        //console.log(first_child);
        return first_child;

    }

    var is_contains_program = function(str,searchstr){
      var is_contain = false;
      if(str.indexOf(searchstr) !== -1)
      is_contain = true;
      return is_contain;
    };

    var programarray = function (str, searchstr) {

        var indices = [], programs = [];
        var idx = str.indexOf(searchstr);
        while (idx != -1) {
            if (programs.length === 0)
                programs.push(str.substr(0, idx));
            else {
                //console.log(str.substring(indices[indices.length-1] + 2, idx ));
                programs.push(str.substring(indices[indices.length - 1] + 2, idx));
            }
            indices.push(idx - 1);
            idx = str.indexOf(searchstr, idx + 1);

        }

        programs.push(str.substring(indices[indices.length - 1] + 2, str.length));
        //console.log(programs);
        return programs;

    };

    var arbitarychildprograms = function(str,searchstr){

        var childprograms=''; var pos;
        pos = str.indexOf(searchstr);
        if(pos!== -1){
            childprograms = str.substring(pos + searchstr.length-1,str.length);
        }
        return childprograms;
    };


    var childprograms = function (programarray,parentstr) {

        var child = [], index = 0, foundparent = false;
        //console.log(programarray);
        _.each(programarray, function (value) {
            //console.log(value);
            if (value === parentstr) {
                foundparent = true;
            }
            if (foundparent && index > 0) {
                child.push(value);
            }
            if (foundparent)
                index = index + 1;
        });
        //console.log(child);
        return child;

    };


    var specificchildprogram = function (programarray,parentstr,pos) {

        var specificchildprogram, index = 0, foundparent = false;
        //console.log(programarray);
        _.each(programarray, function (value) {

            if (value === parentstr) {
                foundparent = true;
            }
            if (foundparent && index > 0 && index === pos) {
                specificchildprogram = value;
            }
            if (foundparent)
                index = index + 1;
        });
        //console.log(specificchildprogram);
        return specificchildprogram;

    };


    return {
        programarray: programarray,
        childprograms: childprograms,
        get_first_child_program:get_first_child_program,
        specificchildprogram:specificchildprogram,
        rootprogram:rootprogram,
        is_contains_program:is_contains_program,
        arbitarychildprograms:arbitarychildprograms
    };
}]);

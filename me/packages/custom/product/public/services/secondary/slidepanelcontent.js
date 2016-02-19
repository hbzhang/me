/**
 * Created by hbzhang on 10/23/14.
 */
'use strict';
angular.module('mean.product').factory('SlidePanelContentData', function($resource) {
    var meds = [{
        "id": "1",
        "name": "Judith",
        "dob":"Jan 13th 1990"
    }, {
        "id": "2",
        "name": "Fiyona",
        "dob":"Aug 03rd 1991"
    }, {
        "id": "3",
        "name": "James",
        "dob":"March 12th 1970"
    }];

    return {
        getMeds: function(medid) {
            if (medid === 0) {
                return meds;
            } else {
                return meds[medid - 1];
            }
        }
    };

});


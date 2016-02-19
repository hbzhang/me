/**
 * Created by hbzhang on 6/30/15.
 */
angular.module('formcoverphotoupload.provider', ['angularFileUpload']).provider(
    '$formcoverphotoupload',
    function() {
       var $http, $injector, $templateCache, $rootScope, FileUploader;
       $injector = null;
       $http = null;
       $templateCache = null;
       $rootScope = null;
       FileUploader = null;


      this.setupProviders = (function(_this) {
        return function(injector) {
            $injector = injector;
            $http = $injector.get('$http');
            $rootScope = $injector.get('$rootScope');
            FileUploader = $injector.get('FileUploader');
            return $templateCache = $injector.get('$templateCache');
        };
     })(this);

    this.upload_coverphoto_functions = (function(_this) {
        return function(scope) {

        scope.hasTn = true;

        scope.thumbnail = {};

            var tnuploader = scope.tnuploader = new FileUploader({
            //scope: $scope,
             autoUpload:true,
             url: '/upload',
             queueLimit: 1
            });

        scope.tnuploadComplete = true;

        scope.tnupload = function() {
            scope.tnuploadComplete = false;
            tnuploader.uploadAll();
        };

        /*$rootScope.$on('formcoverphotofetched', function(event, args) {

                if (!!args.data && JSON.stringify(scope.thumbnail) === '{}') {

                    var el = {
                        fileid : args.data.split('/')[2]

                    };
                    _this.hasTn = true;
                    _this.tnuploadComplete = true;
                    _this.thumbnail = el;
                    console.log(scope.thumbnail);

                }
        });*/


       tnuploader.onSuccessItem = function(item, res, status, header) {
           scope.tnuploadComplete = true;
           scope.thumbnail = res;
           scope.hasTn = true;
           var uploadfileID =  '/upload/' + scope.thumbnail.fileid;
           scope.inputText = uploadfileID;
           scope.updateInput(uploadfileID);  // call angular-mongoose-form-builder updateInput function
           $rootScope.$emit('formcoverphotouploaded', {
               data: uploadfileID
           });

        };

       tnuploader.onErrorItem = function(item, response, status, headers) {
         console.log('error');
       }

       tnuploader.onAfterAddingFile = function(item) {
         console.log(item);
       }
     };
    })(this);

    this.$get = [
        '$injector',(function(_this) {
            return function($injector,navtreefactory) {
                //navtreefactory.nav_tree_build('asdasd');
                var component, name, _ref;
                _this.setupProviders($injector);
                return {
                    upload_coverphoto_functions: _this.upload_coverphoto_functions
                };
            };
        })(this)
    ];
});

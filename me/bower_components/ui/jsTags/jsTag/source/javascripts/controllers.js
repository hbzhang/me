var jsTag = angular.module('jsTag');

jsTag.controller('JSTagMainCtrl', ['$attrs', '$scope', 'InputService', 'TagsInputService', 
  'jsTagDefaults', '$rootScope','JSTagsCollection',
 function($attrs, $scope, InputService, TagsInputService, jsTagDefaults,$rootScope,JSTagsCollection) {
  // Parse user options and merge with defaults
  var userOptions = {};
  try {
    userOptions = $scope.$eval($attrs.jsTagOptions);
  } catch(e) {
    console.log("jsTag Error: Invalid user options, using defaults only");
  }
  
  // Copy so we don't override original values
  var options = angular.copy(jsTagDefaults);
  
  // Use user defined options
  if (userOptions !== undefined) {
    userOptions.texts = angular.extend(options.texts, userOptions.texts || {});
    angular.extend(options, userOptions);
  }
  
  $scope.options = options;
  
  // Export handlers to view
  $scope.tagsInputService = new TagsInputService($scope.options);
  $scope.inputService = new InputService($scope.options);
  
  // Export tagsCollection separately since it's used alot
  var tagsCollection = $scope.tagsInputService.tagsCollection;
  $scope.tagsCollection = tagsCollection;
    
  //
  $scope.$watch('inputService.input', function(newValue, oldValue) {
    //console.log(newValue);
    $rootScope.$broadcast('jsTagsInputValue', {value: newValue});
    //$scope.isThereAnEditedTag = newValue !== null;
  });

   $scope.$watch('JSTagsCollection.tags', function(newValue, oldValue) {
    console.log(newValue);
    $rootScope.$broadcast('jsTagsCollectionValue', {value: newValue});
    //$scope.isThereAnEditedTag = newValue !== null;
  });


  // TODO: Should be inside inside tagsCollection.js
  // On every change to editedTags keep isThereAnEditedTag posted
  $scope.$watch('tagsCollection._editedTag', function(newValue, oldValue) {
    $scope.isThereAnEditedTag = newValue !== null;
  });
  
  // TODO: Should be inside inside tagsCollection.js
  // On every change to activeTags keep isThereAnActiveTag posted
  $scope.$watchCollection('tagsCollection._activeTags', function(newValue, oldValue) {
    $scope.isThereAnActiveTag = newValue.length > 0;
  });
}]);
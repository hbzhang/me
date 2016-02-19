(function() {
  angular.module('app', ['builder', 'builder.components', 'validator.rules']).run([
    '$builder', '$navtree',function($builder,$navtree) {

      var rootname = 'Group 2';
      var name = 'Default';

      var id = $navtree.gen_nav_tree_random_string();
      var id1 = $navtree.gen_nav_tree_random_string();


      $builder.registerComponent('sampleInput', {
        nav_tree:[{
        root: rootname,
        uniqueid:id,
        parentid:'',
        data: [],
        group: 'from html',
        layer: 1,
        child:[{
          root: rootname,
          uniqueid:id1,
          parentid:id,
          data: [],
          group: 'from html 1',
          layer: 2,
          child:[]
        }]
        }],
        group: 'from html',
        label: 'Sample',
        description: 'From html template',
        placeholder: 'placeholder',
        required: false,
        validationOptions: [
          {
            label: 'none',
            rule: '/.*/'
          }, {
            label: 'number',
            rule: '[number]'
          }, {
            label: 'email',
            rule: '[email]'
          }, {
            label: 'url',
            rule: '[url]'
          }
        ],
        templateUrl: 'example/template.html',
        popoverTemplateUrl: 'example/popoverTemplate.html'
  
      });





  
      return $builder.registerComponent('name', {
        nav_tree:[{
        root: rootname,
        uniqueid:id,
        parentid:'',
        data: [],
        group: 'Default',
        layer: 1,
        child:[]
        }],
        group: 'Default',
        label: 'Name',
        required: false,
        arrayToText: true,
        template: "<div class=\"form-group\">\n    <label for=\"{{formName+index}}\" class=\"col-md-4 control-label\" ng-class=\"{'fb-required':required}\">{{label}}</label>\n    <div class=\"col-md-8\">\n        <input type='hidden' ng-model=\"inputText\" validator-required=\"{{required}}\" validator-group=\"{{formName}}\"/>\n        <div class=\"col-sm-6\" style=\"padding-left: 0;\">\n            <input type=\"text\"\n                ng-model=\"inputArray[0]\"\n                class=\"form-control\" id=\"{{formName+index}}-0\"/>\n            <p class='help-block'>First name</p>\n        </div>\n        <div class=\"col-sm-6\" style=\"padding-left: 0;\">\n            <input type=\"text\"\n                ng-model=\"inputArray[1]\"\n                class=\"form-control\" id=\"{{formName+index}}-1\"/>\n            <p class='help-block'>Last name</p>\n        </div>\n    </div>\n</div>",
        popoverTemplate: "<form>\n    <div class=\"form-group\">\n        <label class='control-label'>Label</label>\n        <input type='text' ng-model=\"label\" validator=\"[required]\" class='form-control'/>\n    </div>\n    <div class=\"checkbox\">\n        <label>\n            <input type='checkbox' ng-model=\"required\" />\n            Required\n        </label>\n    </div>\n\n    <hr/>\n    <div class='form-group'>\n        <input type='submit' ng-click=\"popover.save($event)\" class='btn btn-primary' value='Save'/>\n        <input type='button' ng-click=\"popover.cancel($event)\" class='btn btn-default' value='Cancel'/>\n        <input type='button' ng-click=\"popover.remove($event)\" class='btn btn-danger' value='Delete'/>\n    </div>\n</form>"
      });


    }
  ]).controller('DemoController', [
    '$scope', '$builder', '$validator', function($scope, $builder, $validator) {
      //var checkbox, textbox;
      textbox = $builder.addFormObject('default', {
        id: 'textsdfbox',
        component: 'textInput',
        label: 'Name',
        description: 'Your name',
        placeholder: 'Your name',
        required: true,
        editable: false
      });
    
      $scope.form = $builder.forms['default'];
      $scope.input = [];

      $scope.defaultValue = {};
      //$scope.defaultValue[textbox.id] = 'xxx';
      //$scope.defaultValue[checkbox.id] = [true, true];
      //console.log($scope.defaultValue);
      return $scope.submit = function() {
        return $validator.validate($scope, 'default').success(function() {
          return console.log('success');
        }).error(function() {
          return console.log('error');
        });
      };
    }
  ]);

}).call(this);
'use strict';

angular.module('mean.admin').factory('CreateForm',['$resource', '$builder','$rootScope','Restangular', function($resource,$builder,$rootScope,Restangular) {

  var builtinforminformation = {
    formname: function(form){
//http://stackoverflow.com/questions/7364150/find-object-by-id-in-array-of-javascript-objects
      var obj = _.find(form, function(obj) { return obj.id == 'formnametextbox' });
      return obj.value;
    },
    formprogram: function(form){
      var obj = _.find(form, function(obj) { return obj.id == 'formprogramtextbox' });
      return obj.value;
    },
    formdescription: function(form){
      // console.log(event);
      var obj = _.find(form, function(obj) { return obj.id == 'formdescriptiontextbox' });
      return obj.value;
    }
  };

  var addbuiltinforms = (function() {

    this.formnametextbox = $builder.addFormObject('formbuiltinforms', {
      id: 'formnametextbox',
      component: 'textInput',
      label: 'Form Name',
      description: 'Form Name',
      placeholder: 'Form Name',
      required: true,
      editable: false
    });

    this.formprogramtextbox = $builder.addFormObject('formbuiltinforms', {
      id: 'formprogramtextbox',
      component: 'programlist',
      label: 'Program',
      description: 'Program',
      placeholder: 'Program',
      required: true,
      editable: false
    });

    this.formdescriptionareatbox = $builder.addFormObject('formbuiltinforms', {
      id: 'formdescriptiontextbox',
      component: 'textArea',
      label: 'Form Description',
      description: 'Form Description',
      placeholder: 'Form Description',
      required: false,
      editable: false
    });

    return this;

  });
  var forms = Restangular.all('form');


  var builtinformnameid = [
    {id: 'formnametextbox'}
  ];

  var builtinformprogramid = [
    {id: 'formprogramtextbox'}
  ];

  var builtinformdesciptioneid = [
    {id: 'formdescriptiontextbox'}
  ];

  var getForm = function() {
    forms.getList().then(function(forms) {
      var allForms = [];
      _.each(forms, function(value) {

        var formname = _.filter(value.formbasicinformation, function(formbasic){
          return _.find(builtinformnameid, function(builtin){
            return formbasic.id === builtin.id;
          });
        });

        var formprogram = _.filter(value.formbasicinformation, function(formbasic){
          return _.find(builtinformprogramid, function(builtin){
            return formbasic.id === builtin.id;
          });
        });

        var formdescription = _.filter(value.formbasicinformation, function(formbasic){
          return _.find(builtinformdesciptioneid, function(builtin){
            return formbasic.id === builtin.id;
          });
        });

        var forminformation = {'id' : value._id, 'name':formname, 'program': formprogram, 'description':formdescription};

        allForms.push(forminformation);

      });
      //console.log(allForms);
      return allForms;

    });
  };

  return {
    form: $resource('form/:formID', {eventID:'@id'},{update: {method: 'PUT'}}, {query: {method: 'GET', params:{}, isArray: true}}),
    getforms: getForm,
    builtinforms:addbuiltinforms,
    builtinforminformation: builtinforminformation
  };

}]);

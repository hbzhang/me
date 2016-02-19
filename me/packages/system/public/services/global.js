'use strict';

//Global service for global variables
angular.module('mean.system').factory('Global', ['$log', '$q','$rootScope','$http',

  function($log,$q, $rootScope,$http) {
      // Make an AJAX call to check if the user is logged in
     var _this = this;
     var authenticated = false,user;

     var getCheckedin = function(){
       var deferred = $q.defer();
       $http.get('/loggedin').success(function(user) {
         // Authenticated
         deferred.resolve({
           user: user
           });

        /* var isAuthenticated = false;
         if (user !== '0')
           isAuthenticated = true;

         return isAuthenticated;  */
       }).error(function(msg, code) {
         deferred.reject(msg);
         $log.error(msg, code);
       });

       return deferred.promise;
     };

      getCheckedin()
          .then(function(data) {
              authenticated = !!data;
              user = data.user;
              _this._data.user  = user;
              //console.log(_this._data.user);
              //_this._data.authenticated  = authenticated;
          });

      $rootScope.$on('loggedin', function() {
          $http.get('/loggedin')
              .then(function(response) {
                  //console.log(response.data.username);
                  authenticated = !!response;
                  user = response.data;
                  _this._data.user  = user;
                  _this._data.authenticated  = authenticated;

              },
              function (httpError) {
                  // translate the error
                  throw httpError.status + ' :'  +
                  httpError.data;
              });
          //console.log('logged in now');
      });

     _this._data = {
          user: window.user,
          authenticated: authenticated,
          isAdmin: false
        };

        if (window.user && window.user.roles) {
          _this._data.authenticated = window.user.roles.length;
          _this._data.isAdmin = window.user.roles.indexOf('admin') !== -1;
        }
      return _this._data;

  }
]);

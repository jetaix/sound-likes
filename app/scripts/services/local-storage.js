'use strict';

var app = angular.module('soundCloudAppApp');

app.factory('localStorage', function(localStorageService) {
  return {
    setToken: function(value) {
      localStorageService.set('soundcloudToken', value);
    },
    setUserData: function(value) {
      localStorageService.set('userData', value);
    },
    getUserData: function() {
      return localStorageService.get('userData');
    },
    getToken: function() {
      return localStorageService.get('soundcloudToken');
    },
    resetToken: function() {
      return clearAll();
    }
  };
});

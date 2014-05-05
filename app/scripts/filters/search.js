'use strict';

var app = angular.module('soundCloudAppApp');

app.filter('soundName', function() {
  return function (sounds, search) {
    var regexp = new RegExp(search, 'i');
    var matches = [];
    angular.forEach(sounds, function(sound) {
      // filter on app name
      var result = regexp.exec(sound.title);
      if(result !== null && result !== '') {
        matches.push(sound);
      }
    });
    return matches;
  };
});

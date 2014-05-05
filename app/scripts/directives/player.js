'use strict';

var app = angular.module('soundCloudAppApp');

app.directive('player', function() {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      data: '=data'
    },
    template: '<div></div>',
    link: function(scope, element) {
      var html = '<div>Player</div>';
      element.html(html);
    }
  };
});
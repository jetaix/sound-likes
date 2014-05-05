'use strict';

var app = angular.module('soundCloudAppApp');

app.directive('spinner', function() {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      data: '=data'
    },
    template: '<div></div>',
    link: function(scope, element) {
      var html = '<div class="pace"><div class="pace-activity">ttoototo</div></div>';
      element.html(html);
    }
  };
});

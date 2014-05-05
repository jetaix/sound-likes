'use strict';

var app = angular.module('soundCloudAppApp');

app.directive('plangularIcon', function() {
  var xmlHttp = null,
      sprite;
  xmlHttp = new XMLHttpRequest();
  xmlHttp.open('GET', iconUrl, false);
  xmlHttp.send(null);
  if(xmlHttp.responseXML) sprite = xmlHttp.responseXML.documentElement;
  else console.error('Icon sprite not found - check iconUrl variable in plangular.js');
  return {
    restrict: 'A',
    scope: true,
    link: function (scope, elem, attrs) {
      if (!sprite) return false;
      var el = elem[0],
          id = attrs.plangularIcon,
          svg = sprite.getElementById(id).cloneNode(true);
      el.className += ' plangular-icon plangular-icon-' + id;
      svg.removeAttribute('id');
      svg.setAttribute('class', el.className);
      el.parentNode.replaceChild(svg, el);
    }
  }
});
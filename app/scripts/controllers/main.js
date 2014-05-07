'use strict';

angular.module('soundCloudAppApp')
.controller('MainCtrl', function ($scope, $timeout, $http, $cookies) {
    $scope.apiKey = 'b54c0f76b20be90e6d13e95a590c7413';
    $scope.redirectUri = 'http://127.0.0.1:9000/#/';

    if($cookies.soundcloudConnect == true){
        $scope.connect = true;
        $scope.getData();
    }
    else {
        $scope.connect = false;
        $cookies.soundcloudConnect = false;
        $scope.init = true;
        $scope.connect = false;
        $timeout(function(){
            $scope.init = false;
        }, 1000);
    }

    SC.initialize({
        client_id: $scope.apiKey,
        redirect_uri: $scope.redirectUri
    }); 

    $scope.connection = function(){
        SC.connect(function() {
            $scope.getData();
        });

    };
    $scope.getData = function(){
        SC.get('/me', function(data){
            $cookies.soundcloudConnect = true;
            $scope.dataUser = data;
            
            $http({method: 'GET', url: 'http://api.soundcloud.com/users/' + $scope.dataUser.id + '/favorites.json?client_id=' + $scope.apiKey}).
             success(function(data, status, headers, config) {
                 $scope.dataSound = data;
                 $scope.connect = true;
            }).
            error(function(data, status, headers, config) {
             console.log('error');
            });
            
        });
    };

});
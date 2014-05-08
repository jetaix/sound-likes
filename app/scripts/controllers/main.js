'use strict';

angular.module('soundCloudAppApp')
.controller('MainCtrl', function ($scope, $timeout, $http, $cookies, localStorage) {
    $scope.apiKey = 'b54c0f76b20be90e6d13e95a590c7413';
    $scope.redirectUri = 'http://127.0.0.1:9000/#/';
    var app = localStorage.getToken();
    
    SC.initialize({
        client_id: $scope.apiKey,
        redirect_uri: $scope.redirectUri
    });

    $scope.connection = function() {
        SC.connect(function() {
            $scope.getUserData();
        });
    };
    $scope.getUserData = function() {
        SC.get('/me', function(data){
            localStorage.setToken(true);
            $scope.dataUser = data;
            $scope.userStorage = {
                'id' : data.id,
                'name' : data.full_name,
                'avatar' : data.avatar_url,
                'description' : data.description,
                'website' : data.website,
                'followers' : data.followers_count,
                'followings' : data.followings_count,
                'favorites' : data.public_favorites_count
            };

            localStorage.setUserData($scope.userStorage);

            $scope.getSound($scope.userStorage.id);
            
        });
    };
    $scope.getSound = function (id){
        $http({method: 'GET', url: 'http://api.soundcloud.com/users/' + id + '/favorites.json?client_id=' + $scope.apiKey}).
         success(function(data, status, headers, config) {
             $scope.dataSound = data;
             $scope.connect = true;
        }).
        error(function(data, status, headers, config) {
         console.log('error');
        });
    };
    $scope.initialization = function() {
        $scope.init = true;
        $timeout(function(){
            $scope.init = false;
        }, 1000);
    };

    $scope.logout = function() {
        localStorage.setToken(false);
    };

    if ( (app == 'false') || (!app) ){
        $scope.initialization();
    }
    else if (app == 'true') {
        $scope.connect = true;
        $scope.userStorage = localStorage.getUserData();
        var id = $scope.userStorage.id;
        $scope.getSound(id);
    }

});
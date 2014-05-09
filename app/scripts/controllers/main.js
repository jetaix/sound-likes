'use strict';

angular.module('soundCloudAppApp')
.controller('MainCtrl', function ($scope, $timeout, $http, $cookies, localStorage) {
    $scope.apiKey = 'b54c0f76b20be90e6d13e95a590c7413';
    $scope.redirectUri = 'http://127.0.0.1:9000/#/';
    $scope.play = false;
    $scope.limit = 20;
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
        $http({method: 'GET', url: 'http://api.soundcloud.com/users/' + id + '/favorites.json?client_id=' + $scope.apiKey + '&limit=' + $scope.limit + '&offset=0'}).
         success(function(data, status, headers, config) {
             $scope.dataSound = data;
             $scope.connect = true;
             console.log($scope.dataSound);
        }).
        error(function(data, status, headers, config) {
         console.log('error');
        });
    };
    $scope.loadMore = function (id){
        // $http({method: 'GET', url: 'http://api.soundcloud.com/users/' + id + '/favorites.json?client_id=' + $scope.apiKey + '&limit=' + $scope.limit + '&offset=' + $scope.limit}).
        //  success(function(data2, status, headers, config) {
        //      $scope.dataSound.push( data2 );
        //      console.log(data2);
        // }).
        // error(function(data, status, headers, config) {
        //  console.log('error');
        // });
        console.log('loadmore');
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
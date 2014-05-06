'use strict';

angular.module('soundCloudAppApp')
.controller('MainCtrl', function ($scope, $timeout, $http, $window, localStorageService) {

    localStorageService.clearAll();
    localStorageService.set('Favorite Sport','Ultimate Frisbee');

    $scope.apiKey = 'b54c0f76b20be90e6d13e95a590c7413';
    $scope.init = true;
    $scope.connect = false;

    $timeout(function(){
        $scope.init = false;
    }, 1000);

    SC.initialize({
        client_id: $scope.apiKey,
        redirect_uri: 'http://127.0.0.1:9000/#/'
    });

    $scope.connection = function(){

        SC.connect(function() {
            SC.get('/me', function(data){

                $scope.full_name = data.full_name;
                $scope.avatar = data.avatar_url;
                $scope.description = data.description;
                $scope.website = data.website;
                $scope.follower = data.followers_count;
                $scope.following = data.followings_count;
                $scope.favorite = data.public_favorites_count;
                $scope.id = data.id;
                
                $http({method: 'GET', url: 'http://api.soundcloud.com/users/' + data.id + '/favorites.json?client_id=' + $scope.apiKey + '&limit=200'  }).
                 success(function(data, status, headers, config) {
                     $scope.sounds = data;
                     console.log(data);
                     $scope.connect = true;
                }).
                error(function(data, status, headers, config) {
                 console.log('error');
                });
                
            });

        });

    };

});
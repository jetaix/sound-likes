'use strict';

angular.module('soundCloudAppApp')
.controller('MainCtrl', function ($scope, $timeout, $http) {
	
    $scope.apiKey = 'b54c0f76b20be90e6d13e95a590c7413';
    $scope.connect = false;
    SC.initialize({
        client_id: 'b54c0f76b20be90e6d13e95a590c7413',
        redirect_uri: 'http://127.0.0.1:9000/#/'
    });

    $scope.connection = function(){

        SC.connect(function() {
            SC.get('/me', function(data){
               $timeout(function() {
                    $scope.full_name = data.full_name;
                    $scope.avatar = data.avatar_url;
                    $scope.description = data.description;
                    $scope.website = data.website;
                    $scope.follower = data.followers_count;
                    $scope.following = data.followings_count;
                    $scope.favorite = data.public_favorites_count;
                    $scope.id = data.id;
                }, 100);
                
                $http({method: 'GET', url: 'http://api.soundcloud.com/users/' + data.id + '/favorites.json?client_id=b54c0f76b20be90e6d13e95a590c7413'}).
                 success(function(data, status, headers, config) {
                     $scope.sounds = data;
                }).
                error(function(data, status, headers, config) {
                 console.log('error');
                });
                
            });
            $scope.connect = true;

        });

    };

});
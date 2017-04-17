var channels = ['freecodecamp', 'test-channel', "storbeck", "habathcx", "RobotCaleb", "brunofin"];
 
(function(){
  'use strict';
  angular.module('twitchViewer', [])
  .controller('twitchController', 
              ['$scope', '$http', twitchController]);
  function twitchController($scope, $http){
    $scope.data = {}
    var apikey = 'https://wind-bow.glitch.me/twitch-api/'
    channels.forEach(function(channel){
      $http.get(apikey +'channels/' + channel).then(function(response){
      if(response.data.status != 404){
        $scope.data[channel] = {};
        $scope.data[channel]["url"] = "https://www.twitch.tv/" + response.data.name;
        $scope.data[channel]["name"] = response.data.display_name;
        if(response.data.logo == null){
          $scope.data[channel]["logo"] = 'https://www-cdn.jtvnw.net/images/twitch_logo3.jpg'
        } else {
        $scope.data[channel]["logo"] = response.data.logo;
          }
        $scope.data[channel]["views"] = response.data.views;
        $scope.data[channel]["subscribers"] = response.data.followers;
        }
      });
      $http.get(apikey +'streams/' + channel).then(function(response){
      if(response.data.status != 404 && response.data.status != 400){
        if(response.data.stream == null){ 
          $scope.data[channel]["status"] = "Offline";
          $scope.data[channel]["statusColor"] = '#292E37';
          $scope.data[channel]["game"] = "None";
        } else if (response.data.stream == undefined){
          $scope.data[channel]["status"] = "Account closed";
          $scope.data[channel]["statusColor"] = '#691919';
          $scope.data[channel]["game"] = "None";
        } else {
          $scope.data[channel]["status"] = "Online";
          $scope.data[channel]["statusColor"] = '#40E0D0';
          $scope.data[channel]["game"] = response.data.game;
        }
      }
      console.log($scope.data);  
      });
    });
  }
}());
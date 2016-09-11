var app = angular.module('app', []);

app.controller('Controller', function appControllerFunction($scope, $http) {
  $scope.teams = [];
  $scope.years = [];
  $scope.settings = {};
  $scope.settings.year = new Date().getFullYear();
  $scope.settings.teamId = "CAR";
  $scope.settings.imageUrl = "NFL256x256.png";
  $scope.settings.indexYear = 0;
  $scope.settings.indexTeam = 0;
  $http.get('/TextFeed2Images/JsonServlet?action=years').success(
    function(data) {
      $scope.years = data;
    }
  );
  $http.get('/TextFeed2Images/JsonServlet?action=teams').success(
    function(data) {
      $scope.teams = data;
      $scope.restoreSettings();
      $scope.change();
    }
  );
  $scope.change = function() {
    console.log("Year: " + $scope.settings.year + " teamId: " + $scope.settings.teamId);
    $scope.settings.imageUrl = "/TextFeed2Images/images/" + $scope.settings.year + $scope.settings.teamId + ".png";
    $scope.saveSettings();
  }
  $scope.saveSettings = function() {
    localStorage.setItem("teamSettings", JSON.stringify($scope.settings));
  }
  $scope.restoreSettings = function() {
    var settings = JSON.parse(localStorage.getItem("teamSettings"));
    if (settings == null) {
      console.log("Settings is null from localStorage");
    } else {
      $scope.settings = settings;
      console.log(JSON.stringify($scope.settings));
    }
  }
  $(function() {
    $("#container").swipe({
      swipe: function(event, direction, distance, duration, fingerCount, fingerData) {
        console.log("BEFORE - Index team: " + $scope.settings.indexTeam + " index year: " + $scope.settings.indexYear);
        if (direction == "left") {
          console.log("Left");
          $scope.settings.indexYear--;
        }
        if (direction == "right") {
          console.log("Right");
          $scope.settings.indexYear++;
        }
        if (direction == "down") {
          console.log("Down");
          $scope.settings.indexTeam--;
        }
        if (direction == "up") {
          console.log("Up");
          $scope.settings.indexTeam++;
        }
        if ($scope.settings.indexYear < 0) {
          $scope.settings.indexYear = $scope.years.length - 1;
        }
        if ($scope.settings.indexYear >= $scope.years.length) {
          $scope.settings.indexYear = 0;
        }
        if ($scope.settings.indexTeam < 0) {
          $scope.settings.indexTeam = $scope.teams.length - 1;
        }
        if ($scope.settings.indexTeam >= $scope.teams.length) {
          $scope.settings.indexTeam = 0;
        }
        console.log("AFTER - Index team: " + $scope.settings.indexTeam + " index year: " + $scope.settings.indexYear);
        $scope.settings.teamId = $scope.teams[$scope.settings.indexTeam].teamId;
        $scope.settings.year = $scope.years[$scope.settings.indexYear];
        $scope.change();
        $scope.$apply();
      },
      threshold: 0
    });
  });
});
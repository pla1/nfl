var app = angular.module('app', []);

app.controller('Controller', function appControllerFunction($scope, $http) {
  $scope.teams = [];
  $scope.years = [];
  $scope.settings = {};
  $scope.settings.year = new Date().getFullYear();
  $scope.settings.teamId = "CAR";
  $scope.settings.imageUrl = "NFL256x256.png";
  $http.get('/TextFeed2Images/JsonServlet?action=teams').success(
      function(data) {
        $scope.teams = data;
      }
    );
    $http.get('/TextFeed2Images/JsonServlet?action=years').success(
      function(data) {
        $scope.years = data;
      }
    );
    $scope.change = function() {
      console.log("Year: "  + $scope.settings.year + " teamId: " + $scope.settings.teamId);
      $scope.settings.imageUrl="/TextFeed2Images/images/"+$scope.settings.year+$scope.settings.teamId+".png";
    }
});

var app = angular.module('app', []);

app.controller('Controller', function appControllerFunction($scope, $http) {
  $scope.teams = [];
  $http.get('/TextFeed2Images/JsonServlet?action=teams').success(
      function(data) {
        $scope.teams = data;
      }
    );
    $scope.team = function(team) {
      console.log(JSON.stringify(team));
    }
});

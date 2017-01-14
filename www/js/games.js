var app = angular.module('app', []);

app.controller('Controller', function appControllerFunction($scope, $http) {
    $http.get('/TextFeed2Images/JsonServlet?action=games').success(
        function(data) {
            $scope.games = data;
        }
    );
});

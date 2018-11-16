angular.module('gas', [])
    .controller('MainCtrl', [
        '$scope', '$http',
        function($scope, $http) {
            $scope.log = [];
            $scope.addLog = function() {
                var newEntry = { date: $scope.date, miles: $scope.miles, gallons: $scope.gallons, cost: $scope.cost };
                $http.post('/gas', newEntry).success(function(data) {
                    $scope.log.push(data);
                });
                $scope.date = '';
                $scope.miles = '';
                $scope.gallons = '';
                $scope.cost = '';
            };
            $scope.getAll = function() {
                return $http.get('/gas').success(function(data) {
                    console.log(data);
                    // angular.copy(data, $scope.comments);
                });
            };
        }
    ]);
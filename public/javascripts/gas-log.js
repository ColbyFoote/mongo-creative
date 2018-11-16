angular.module('comment', [])
    .controller('MainCtrl', [
        '$scope', '$http',
        function($scope, $http) {
            $scope.log = [];
            $scope.addLog = function() {
                var newEntry = { date: $scope.formContent, miles: 0, gallons: 0, cost: 0 };
                $http.post('/gas', newEntry).success(function(data) {
                    $scope.log.push(data);
                });
                $scope.formContent = '';
            };
        }
    ]);
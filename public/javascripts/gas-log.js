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
                    makeGraph(data);
                    makeList(data);
                    // angular.copy(data, $scope.comments);
                });
            };
            $scope.deleteAll = function() {
                $http.delete('/gas')
                    .success(function(data) {
                        console.log("delete worked");
                    });
            };
        }
    ]);

function makeGraph(mdata) {
    var myPlot = document.getElementById('graphgoeshere');

    var mileage = [];
    var date = [];

    for (var i = 0; i < mdata.length; i++) {
        mileage.push(mdata[i].miles / mdata[i].gallons)
        date.push(mdata[i].date)
    }

    var trace1 = {
        x: date,
        y: mileage,
        mode: 'markers',
        type: 'scatter'
    };

    var data = [trace1];
    var layout = {
        xaxis: {
            title: 'Date'
        },
        yaxis: {
            title: 'Miles per Gallons'
        }
    }

    Plotly.newPlot('graphgoeshere', data, layout);
}

function makeList(mdata) {
    var listHtml = "<ul class='collection'>";

    for (var i = 0; i < mdata.length; i++) {
        if (mdata[i].date) {
            var newListItem = "<li class='collection-item'> Date: " + mdata[i].date + "    Miles: " + mdata[i].miles + "    Gallons: " + mdata[i].gallons + "    Cost: $" + mdata[i].cost + "</li>";
        listHtml +=  newListItem;
        } 
    }
    listHtml += "</ul>";

    document.getElementById('listOfAwesomeness').innerHTML = listHtml;
}

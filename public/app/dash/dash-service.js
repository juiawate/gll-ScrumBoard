/**
 * Created by natalie on 9/14/2015.
 */
angular.module('scrumBoardApp.dash', [])
    .controller('DashController', ['$scope', '$interval', '$http', '$location', 'Accounts', function ($scope, $interval, $http, $location, Accounts) {
        $scope.update(false, true, true);
        $scope.user = Accounts.user;
        $scope.prettyDate  = function(inDate){
            var date = '' + inDate;
            return date;
        };
        $scope.showEntries = function () {
            var url = '/attendance/roster';
            $http.get(url).success(function (result) {
                $scope.dataList = result;
            });
            $http.get('/authenticate/all').success(function (result) {
                $scope.inCount = result.message.length;
                $scope.presentList = result.message;
                console.log("Here's the result.message", result.message);
            });
        };
    }]);
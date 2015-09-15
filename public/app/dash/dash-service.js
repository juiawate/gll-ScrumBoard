/**
 * Created by natalie on 9/14/2015.
 */
angular.module('scrumBoardApp.dash', [])
    .controller('DashController', ['$scope', '$interval', '$http', '$location', 'Accounts', function ($scope, $interval, $http, $location, Accounts) {
        $scope.update(false, true, true);
        $scope.user = Accounts.user;
        console.log('line 8 of dash-s', $scope.user);
        $scope.prettyDate  = function(inDate){
            var date = '' + inDate;
            return date;
        };
        $scope.showEntries = function (name) {
            name = $scope.user.userId;
            var url = '/attendance/roster';
            $http.get(url).success(function (result) {
                $scope.dataList = result;
                console.log('line 7:', $scope.dataList);
            });
        };
    }])
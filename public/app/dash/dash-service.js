/**
 * Created by natalie on 9/14/2015.
 */
angular.module('scrumBoardApp.dash', [])
    .controller('DashController', ['$scope', '$interval', '$http', '$location', 'Accounts', function ($scope, $interval, $http, $location, Accounts) {
        $scope.update(false, true, true);
        $scope.user = Accounts.user;
        $scope.seeLog = false;
        $scope.maps = function (coords){
           return 'http://maps.google.com/?ie=UTF8&hq=&ll=' + coords[0] + ',' + coords[1];
        };
        $scope.prettyDate  = function(inDate){
            var date = new Date(inDate);
            return date;
        };
        $scope.showEntries = function () {
            var url = '/attendance/roster';
            $http.get(url).success(function (result) {
                $scope.dataList = result;
            });
            $http.get('/authenticate/all').success(function (result) {
                var rightNow = new Date();
                $scope.inCount = result.message.length;
                $scope.presentList = result.message;
                $scope.presentList.forEach(function (member) {
                    var myTime = member.timestamp;
                    if (rightNow.getFullYear() == myTime.substr(0,4) && rightNow.getMonth() + 1 == myTime.substr(5,2)){
                        console.log('true', rightNow);
                    }
                });
                console.log('line 21 from d-s:', $scope.presentList);
            });
        };
    }]);

angular.module('scrumBoardApp.home', [])
    .controller('HomeController', ['$scope', '$interval', '$location', 'Accounts', function ($scope, $interval, $location, Accounts) {
        $scope.update(false, true, true);
        $scope.user = Accounts.user;
        $scope.checkIn_err = false;
        $scope.checkOut_err = false;
        $scope.checkedin = false;
        $scope.time = new Date();
        $scope.clock = $interval(function(){
            $scope.time = new Date();
        }, 1000);
        $scope.timestamp = 0;
        $scope.checkOut = function () {
            $scope.timestamp = new Date();
            console.log('checkout:', $scope.timestamp);
            Accounts.checkOut($scope.user).then(function (data) {
                $location.path('/home');
            }, function (data) {
                $scope.checkOut_err = true;
                $scope.user = {};
                if (data.message) $scope.error_msg = data.message;
            });
        };
        $scope.checkIn = function () {
            $scope.timestamp = new Date();
            console.log('checkin:', $scope.timestamp);
            Accounts.checkIn($scope.user).then(function (data) {
                $location.path('/home');
            }, function (data) {
                $scope.checkIn_err = true;
                $scope.user = {};
                if (data.message) $scope.error_msg = data.message;
            });
        };
    }]);

angular.module('scrumBoardApp.home', [])
    .controller('HomeController', ['$scope', '$interval', '$location', 'HomeAccounts', 'Accounts', function ($scope, $interval, $location, HomeAccounts, Accounts) {
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
            HomeAccounts.checkOut($scope.user).then(function (data) {
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
            HomeAccounts.checkIn($scope.user).then(function (data) {
                $location.path('/home');
            }, function (data) {
                $scope.checkIn_err = true;
                $scope.user = {};
                if (data.message) $scope.error_msg = data.message;
            });
        };
    }])
    .service('HomeAccounts', function ($http, $q) {
        var _user = null;
        return {
            checkIn: function(user){
                return $q(function (resolve, reject) {
                    console.log('user:', user);
                    $http.post('/attendance/roster', user).success(function (data) {
                        console.log('data.user:', data.user);
                        _user = data.user;
                        resolve(_user);
                    }).error(function (data) {
                        reject(data);
                    });
                });
            },
            checkOut: function(user){
                return $q(function (resolve, reject) {
                    $http.post('/attendance/roster', user).success(function (data) {
                        _user = data.user;
                        resolve(_user);
                    }).error(function (data) {
                        reject(data);
                    });
                });
            },
            get user() {
                return _user;
            }
        };
    });
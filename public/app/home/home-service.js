angular.module('scrumBoardApp.home', [])
    .controller('HomeController', ['$scope', '$interval', '$http', '$location', 'HomeAccounts', 'Accounts', function ($scope, $interval, $http, $location, HomeAccounts, Accounts) {
        $scope.update(false, true, true);
        $scope.user = Accounts.user;
        $scope.prettyDate  = function(inDate){
            var date = '' + inDate;
            return date;
        };
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
            HomeAccounts.checkIn($scope.user).then(function (data) {
                $location.path('/home');
            }, function (data) {
                $scope.checkIn_err = true;
                $scope.user = {};
                if (data.message) $scope.error_msg = data.message;
            });
            console.log('checkin:', $scope.timestamp);
        };
        $scope.showEntries = function (name) {
            name = $scope.user.userId;
            var url = '/attendance/roster?userId=' + name;
            $http.get(url).success(function (result) {
                $scope.dataList = result;
                console.log('line 7:', $scope.dataList);
            });
        };
        $scope.updateStatus = function () {

        }
    }])
    .service('HomeAccounts', function ($http, $q) {
        var _user = null;
        return {
            checkIn: function(user){
                return $q(function (resolve, reject) {
                    user.action = 'checkin';
                    user.date = new Date();
                    $http.put('/authenticate/validate', user).success(function (data) {
                        console.log('line 78 of h-s');
                        _user = data.user;
                        resolve(_userStatus);
                    }).error(function (data) {
                        reject(data);
                    });
                    $http.post('/attendance/roster', user).success(function (data) {
                        _user = data.user;
                        console.log('line 59',_user);
                        resolve(_user);
                    }).error(function (data) {
                        reject(data);
                    });
                });
            },
            checkOut: function(user){
                return $q(function (resolve, reject) {
                    user.action = 'checkout';
                    user.date = new Date();
                    $http.put('/authenticate/validate', user).success(function (data) {
                        console.log('line 78 of h-s');
                        _user = data.user;
                        resolve(_userStatus);
                    }).error(function (data) {
                        reject(data);
                    });
                    $http.post('/attendance/roster', user).success(function (data) {
                        console.log('line 71 of h-s');
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
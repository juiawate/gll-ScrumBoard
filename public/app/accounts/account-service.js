
angular.module('scrumBoardApp.accounts', [])
    .controller('RegisterController', ['$scope', '$location', 'Accounts', function ($scope, $location, Accounts) {
        $scope.update(true, false, true);
        $scope.user = {};
        $scope.signup = function () {
            $scope.user.type = $scope.user.type || 'Member';
            $scope.user.status = 'out';
            Accounts.register($scope.user).success(function (data) {
                $scope.registration_err = false;
                console.log('line 11 of acc-s:', $scope.user);
                $scope.user = {};
                $location.path('/login');
            }).error(function (data) {
                $scope.registration_err = true;
                $scope.user = {};
                if (data.message) $scope.error_msg = data.message;
            });
        };
    }])
    .controller('LoginController', ['$scope', '$location', 'Accounts', function ($scope, $location, Accounts) {
        $scope.update(true, true, false);
        $scope.user = {};
        $scope.login_err = false;
        $scope.login = function () {
            Accounts.login($scope.user).then(function (data) {
                    if(data.user.type === 'Admin'){
                        $location.path('/dash');
                    }
                    else{
                        $location.path('/home');
                    }
            }, function (data) {
                $scope.login_err = true;
                $scope.user = {};
                if (data.message) $scope.error_msg = data.message;
            });
        };
    }])
    .service('Accounts', function ($http, $q) {
        var _user = null;
        return {
            register: function (user) {
                return $http.post('/authenticate/register', user);
            },
            login: function (user) {
                return $q(function (resolve, reject) {
                    $http.post('/authenticate/login', user).success(function (data) {
                        _user = data.user;
                        resolve(data);
                    }).error(function (data) {
                        reject(data);
                    });
                });
            },
            validate: function () {
                return $q(function (resolve, reject) {
                    $http.get('/authenticate/validate').success(function (data) {
                        _user = data.user;
                        resolve(_user);
                    }).error(function (data) {
                        reject(data);
                    });
                });
            },
            logout: function () {
                return $q(function (resolve, reject) {
                    $http.get('/authenticate/logout').success(function (data) {
                        resolve(data);
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

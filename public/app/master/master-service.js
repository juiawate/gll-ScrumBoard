/**
 * Created by natalie on 9/22/2015.
 */
/**
 * Created by natalie on 9/14/2015.
 */
angular.module('scrumBoardApp.master', [])
    .controller('MasterController', ['$scope', '$interval', '$http', '$location', 'svcMaster', 'Accounts', function ($scope, $interval, $http, $location, svcMaster, Accounts) {
        $scope.edit = false;
        $scope.update(false, true, true);
        $scope.user = Accounts.user;
        if($scope.user.type !== 'Master'){
            if($scope.user.type === 'Admin'){
                $http.get('/403').success(function (result) {
                });
                window.location = './#/dash';
            }
            else{
                $http.get('/403').success(function (result) {
                });
                window.location = './#/home';
            }
        };
        $scope.getMembers = function () {
            $http.get('/authenticate/all').success(function (result) {
                $scope.memberList = result.message;
                $scope.memberList.forEach(function (member) {
                    member.edit = false;
                });
            });
        };
        $scope.saveInfo = function (user, info, key) {
            $scope.edit = {
                userId: user,
                key: key,
                value: info
            };
            svcMaster.saveInfo($scope.edit).then(function (data) {
            }, function (data) {
                $scope.edit_err = true;
                $scope.edit = {};
                if (data.message) $scope.error_msg = data.message;
            });
        };
    }])
    .service('svcMaster', function ($http, $q) {
        var _edit = null;
        return {
            saveInfo: function(edit){
                return $q(function (resolve, reject) {
                    $http.patch('/authenticate/edit', edit).success(function (data) {
                        _edit = data.edit;
                        resolve(_edit);
                    }).error(function (data) {
                        reject(data);
                    });
                });
            },
            get edit() {
                return _edit;
            }
        };
    });
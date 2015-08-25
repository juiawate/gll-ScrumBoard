
angular.module('scrumBoardApp').controller('mainController', ['$scope','$location','Accounts', function($scope, $location, Accounts){
    //console.log('Inside Main controller');
    $scope.show = {};
    $scope.update = function(logout, login, register){
        $scope.show.Logout = logout;
        $scope.show.Login = login;
        $scope.show.Register = register;
    };
    $scope.update(true, false, false);
    $scope.logout = function () {
        Accounts.logout().then(function (data) {
            //console.log('logged out');
            $location.path('/login');
        }, function (data) {
            if(data.message) $scope.error_msg = data.message;
        });
        $scope.update(true, false, false);
    };
}]);

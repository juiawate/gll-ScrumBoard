
angular.module('scrumBoardApp.home', [])
    .controller('HomeController', ['$scope', 'Accounts', function ($scope, Accounts) {
        $scope.update(false, true, true);
        $scope.user = Accounts.user;
    }]);
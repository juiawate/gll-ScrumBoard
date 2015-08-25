
angular.module('scrumBoardApp', ['scrumBoardApp.accounts', 'scrumBoardApp.home', 'ui.router']).config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('register', {
            url: '/register',
            templateUrl: '/app/accounts/_register.html',
            controller: 'RegisterController'
        }).state('login', {
            url: '/login',
            templateUrl: '/app/accounts/_login.html',
            controller: 'LoginController'
        }).state('home', {
            url: '/home',
            templateUrl: 'app/home/_home.html',
            controller: 'HomeController'
        });
    $urlRouterProvider.otherwise('/');
}).run(function (Accounts, $location) {
    Accounts.validate().then(function (results) {
        if(results) {
            console.log(results);
            Accounts.user = results.name;
            $location.path('/home');
        }
        else $location.path('/login');
    }, function () {
        $location.path('/');
    });
});
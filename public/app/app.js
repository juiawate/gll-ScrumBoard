
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
        }).state('checkIn', {
            url:'/home',
            templateUrl: 'app/home/_home.html',
            controller: 'HomeController'
        }).state('checkOut', {
            url:'/home',
            templateUrl: 'app/home/_home.html',
            controller: 'HomeController'
        }).state('dash', {
            url: '/dash',
            templateUrl: 'app/dash/_dash.html',
            controller: 'DashController'
        });
    $urlRouterProvider.otherwise('/');
}).run(function (Accounts, $location) {
    Accounts.validate().then(function (results) {
        if(results) {
            Accounts.user = results;
            console.log('line 35 of app/app',Accounts.user);
            if(Accounts.user.type === 'Admin'){
                $location.path('/dash');
            }
            else{
                $location.path('/home');
            }
        }
        else $location.path('/login');
    }, function () {
        $location.path('/');
    });
});
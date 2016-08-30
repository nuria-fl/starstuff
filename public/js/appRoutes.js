// public/js/appRoutes.js
angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider

        // home page
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'homeController',
            controllerAs: 'home'
        })

        .when('/calendar', {
            redirectTo: function(){
                var today = new Date();
                var currYear = today.getFullYear();
                var currMonth = today.getMonth() + 1;
                return '/calendar/'+currYear+'/'+currMonth;
            }
        })

        .when('/calendar/:YEAR/:MONTH', {
            templateUrl: 'views/calendar.html',
            controller: 'eventsController'
        })

        .when('/calendar/range/:FROM/:TO',{
            templateUrl: 'views/calendar.html',
            controller: 'eventsController'
        })
        
        .when('/event/:ID', {
            templateUrl: 'views/event-single.html',
            controller: 'singleEventController',
            controllerAs: 'event'
        })

        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'loginController'
        })

        .when('/login/:ERROR', {
            templateUrl: 'views/login.html',
            controller: 'loginController'
        })

        .when('/user/:USER', {
            templateUrl: 'views/profile.html',
            controller: 'profileController'
        })

        .when('/credits', {
            templateUrl: 'views/credits.html'
        })

    $locationProvider.html5Mode(true);

}]);

module.exports = 'appRoutes';
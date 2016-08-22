// public/js/appRoutes.js
angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider

        // home page
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'homeController'
        })

        .when('/calendar', {
            templateUrl: 'views/calendar.html',
            controller: 'eventsController'
        })

        .when('/calendar/event/:ID', {
            templateUrl: 'views/event-single.html',
            controller: 'singleEventController'
        })


        // // nerds page that will use the NerdController
        // .when('/nerds', {
        //     templateUrl: 'views/nerd.html',
        //     controller: 'NerdController'
        // });

    $locationProvider.html5Mode(true);

}]);
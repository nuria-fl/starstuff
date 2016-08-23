// public/js/appRoutes.js
angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider

        // home page
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'homeController'
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

        .when('/event/:ID', {
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
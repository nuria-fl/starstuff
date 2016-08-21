angular.module( 'config', [ ] )
    .config( function( $routeProvider ){
        $routeProvider
            .when('/',{
                templateUrl: 'app/views/home.html',
                controller: 'homeController'
            })
            .when('/calendar',{
                templateUrl: 'app/views/calendar.html',
                controller: 'eventsController'
            })
            .when('/calendar/event/:ID',{
                templateUrl: 'app/views/event-single.html',
                controller: 'singleEventController'
            })
            .when('/gallery',{
                templateUrl: 'app/views/gallery.html',
                controller: 'galleryController'
            })
            // .when('/gallery/photo/:ID',{
            //     templateUrl: 'app/views/gallery-single.html',
            //     controller: 'galleryController'
            // })
            // .when('/user/:ID',{
            //     templateUrl: 'app/views/user.html',
            //     controller: 'usersController'
            // })
        .otherwise({ redirectTo: '/' }); ;
    })
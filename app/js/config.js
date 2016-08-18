angular.module( 'config', [ ] )
    .config( function( $routeProvider ){
        $routeProvider
            .when('/',{
                templateUrl: 'app/views/home.html',
                controller: 'homeController'
            })
        .otherwise({ redirectTo: '/' }); ;
    })
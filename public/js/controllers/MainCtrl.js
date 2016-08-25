angular.module('MainCtrl', 
	[
		'homeController', 
		'eventsController', 
		'searchByDateController', 
		'filterController', 
		'singleEventController',
		'loginController',
		'profileController'
	])
	.run(function($location, $rootScope, $cookies){
		// initialize array to store the user's history
		var history = [];
		// change page event
		$rootScope.$on("$routeChangeSuccess", function(currentRoute, previousRoute){
			// set some parameters to show active class in menu
			history.push($location.$$path);
			$rootScope.isHome = $location.path() === '/';
			$rootScope.activePage = $location.path();
			// check if we have user globally
			if($cookies.get('userCookie')){
				$rootScope.user = $cookies.get('userCookie');
			} else {
				$rootScope.user = false;
			}
		});
		// back function to go to previous page
		$rootScope.back = function () {
	        var prevUrl = history.length > 1 ? history.splice(-2)[0] : "/calendar";
	        $location.path(prevUrl);
	    };
		// this will be an easter egg
		var easter_egg = new Konami(function() { 
			console.log('Konami code!');
		});

	})
	// .controller( 'galleryController' , function ( $scope ) {
	// 	var gallery = [1,2,3,4,5,6,7,8,9];
	// 	$scope.gallery = gallery;
	// })
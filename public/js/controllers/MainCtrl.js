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
		$rootScope.$on("$routeChangeSuccess", function(currentRoute, previousRoute){
			$rootScope.isHome = $location.path() === '/';
			$rootScope.activePage = $location.path();
			if($cookies.get('userCookie')){
				$rootScope.user = $cookies.get('userCookie');
			} else {
				$rootScope.user = false;
			}
		});
		var easter_egg = new Konami(function() { 
			console.log('Konami code!');
		});

	})
	// .controller( 'galleryController' , function ( $scope ) {
	// 	var gallery = [1,2,3,4,5,6,7,8,9];
	// 	$scope.gallery = gallery;
	// })
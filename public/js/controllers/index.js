var homeCtrl = require('./homeController'); 
var eventsCtrl = require('./eventsController'); 
var searchByDateCtrl = require('./searchByDateController'); 
var filterCtrl = require('./filterController'); 
var singleEventCtrl = require('./singleEventController'); 
var loginCtrl = require('./loginController'); 
var profileCtrl = require('./profileController'); 
var uploadCtrl = require('./uploadController'); 

angular.module('MainCtrl', 
	[
		homeCtrl, 
		eventsCtrl,
		searchByDateCtrl,
		filterCtrl,
		singleEventCtrl,
		loginCtrl,
		profileCtrl,
		uploadCtrl
	])
	.run(function($location, $rootScope, $cookies, $route){
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
			// make sure easter egg is hidden
			$rootScope.showEasterEgg = false;
		});
		// back function to go to previous page
		$rootScope.back = function () {
	        var prevUrl = history.length > 1 ? history.splice(-2)[0] : "/calendar";
	        $location.path(prevUrl);
	    };
	    // logout user
	    $rootScope.logout = function(){
			$cookies.remove('userCookie')
			if($location.path('/')){
				$route.reload();
			} else {
				$location.path('/')
			}
			// $location.path('/')

		};
		// this will be an easter egg
		var easter_egg = new Konami(function() { 
			$rootScope.$apply(function () {
				$rootScope.showEasterEgg = true;
			});
		});
		$rootScope.hideEasterEgg = function(){
			$rootScope.showEasterEgg = false;
		}

	})
	// .controller( 'galleryController' , function ( $scope ) {
	// 	var gallery = [1,2,3,4,5,6,7,8,9];
	// 	$scope.gallery = gallery;
	// })
module.exports = 'MainCtrl';
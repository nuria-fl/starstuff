function runApp($location, $rootScope, $route, User){
	// initialize array to store the user's history
	var history = [];
	// change page event
	$rootScope.$on("$routeChangeSuccess", function(currentRoute, previousRoute){
		// set some parameters to show active class in menu
		history.push($location.$$path);
		$rootScope.isHome = $location.path() === '/';
		$rootScope.activePage = $location.path();
		// check if we have user globally
		if(User.getToken()){
			$rootScope.user = User.parseJwt(User.getToken()).username;
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
		User.logout();
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
	};
}
module.exports = runApp;
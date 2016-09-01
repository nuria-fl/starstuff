function profileHelper ( $scope, $location, $route, $routeParams, User, Event, Icons, Image ) {
	var user;
	if($location.path()=== '/myprofile'){
		$scope.myprofile = true;
		if(User.getToken()){
			// if the user is logged in
			user = User.parseJwt(User.getToken()).username;		
		} else {
			$location.path('/login')
		}
	} else {
		user = $routeParams.USER;
		if(User.getToken()){
			// if the user is logged in
			var userToken = User.parseJwt(User.getToken()).username;		
			if(userToken === user){
				$location.path('/myprofile');
			}
		}
	}

	//get user info from db
	User.get(user)
		.then(function(dataUser){
			var user = dataUser.data[0];
			var events = [];
			//get events that user saved from db
			user.events.forEach(function(elem){
				Event.getOne( elem )
					.then(function(dataEvent){
						events.push(dataEvent.data) // create an array of the added events IDs
					});
			});
			$scope.user = user;
			$scope.added = true; // we set the added parameter (used to hide the add to calendar button) to true because we know that all the events are added
			$scope.events = events;
			$scope.title = $scope.myprofile ? 'My profile' : $scope.user.username;
			
		});
	// set default range to show events (from now until the end of time)
	var normalRange = {
		dateFrom: new Date(),
		dateTo: new Date('2016-12-31')
	};

	$scope.range = normalRange;
	$scope.reverse = false; // this will be used to reverse event order when viewing past events

	$scope.viewPast = function(){
		//show events from now until the beginning of time (reverse order)
		$scope.reverse = true;
		$scope.range = {
			dateFrom: new Date('2010-12-31'),
			dateTo: new Date()
		};
	};
	$scope.viewUpcoming = function(){
		//set range and reverse to default when viewing upcoming events
		$scope.reverse = false;
		$scope.range = normalRange;
	};

	//get icons to display
	$scope.iconVisibilityName = function(event){
		return Icons.getIconVisibility(event);
	};
	$scope.iconCategoryName = function(event){
		return Icons.getIconCat(event);
	};

	//remove event from db
	$scope.removeFromCalendar = function(eventId){
		User.removeEvent(user, eventId)
			.then(function(){
				// remove item from array
				$scope.events.forEach(function(elem, i){
					if(elem._id === eventId){
						$scope.events.splice(i, 1);
					}
				})
			});
	};
}
module.exports = profileHelper;
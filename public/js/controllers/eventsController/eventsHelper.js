function eventsHelper ( $scope, $rootScope, $routeParams, $location, Event, User, Dates, Icons ) {

	var dateFrom, dateTo, limit;

	//hide the nav arrows by default
	$scope.showMonthNav = false;
	//hide the date-range filter
	$scope.showDateFilter = false;
	//toggle the date-range filter
	$scope.toggleDateFilter = function(){
		if($scope.showDateFilter === true){
			$scope.showDateFilter = false;
		} else {
			$scope.showDateFilter = true;
		}
	};

	if($location.path() === '/'){
		// if is home we show 10 elements starting from yesterday (to ensure events happening during today get in the range)
		var yesterday = (new Date()).getTime()  - (24 * 60 * 60 * 1000);

		dateFrom = new Date(yesterday);
		dateTo = new Date('2016-12-31');
		limit = 10;

	} else if($routeParams.TO){
		// if we have a date range defined
		dateFrom = $routeParams.FROM;
		dateTo = $routeParams.TO;
		//disable arrow navigation
		
		//title of the page displays the selected range
		$scope.dateTitle = 'Events from ' + dateFrom + ' to ' + dateTo; 
	} else {
		// else we get the events from the current month
		var dates = Dates.getMonth($routeParams.YEAR, $routeParams.MONTH);
	
		dateFrom = dates.dateFrom;
		dateTo = dates.dateTo;

		var currYear = dateFrom.split('-').shift();

		var monthName = Dates.getMonthName(dateFrom);
		$scope.dateTitle = monthName + ' ' + currYear;

		//set arrow navigation routes
		$scope.showMonthNav = true; 
		$scope.navRoutes = {
			routePrevMonth: '/#/calendar/'+ dates.prevMonth,
			routeNextMonth: '/#/calendar/'+ dates.nextMonth
		};
	}		

	// get the events from the range we just set
	Event.getRange(dateFrom, dateTo, limit)
		.then( function( dataEvents ) {
			$scope.events = dataEvents.data;
		});

	// get icons to display
	$scope.iconVisibilityName = function(event){
		return Icons.getIconVisibility(event);
	};

	$scope.iconCategoryName = function(event){
		return Icons.getIconCat(event);
	};
	
	// get user events (if user is logged in)
	var user = $rootScope.user;
	$scope.user = user;

	//initialize array to store added items
	var addedItems = [];
	// if we have a user logged in we retrieve their events and store them into the array
	if(user){
		User.get(user)
			.then(function(dataUser){
				var dataUser = dataUser.data[0];
				addedItems = dataUser.events;
			});
	}
	// check if the event has been saved by the user to show or hide the Add to calendar button
	$scope.added = function(user, eventId){
		if(addedItems.indexOf(eventId) !== -1){
			return true; //hide
		} else {
			return false; //show
		}
		
	};
	$scope.addToCalendar = function(user, eventId){
		// add the event to the database
		User.addEvent(user, eventId)
			.then(function(){
				addedItems.push(eventId); // and store it in the saved events array
			});
	};
}

module.exports = eventsHelper;
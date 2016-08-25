angular.module('eventsController', [])
.controller( 'eventsController' , function ( $scope, $rootScope, $routeParams, Event, User, $location, Icons, Categories, Visibility ) {

	var dateFrom, dateTo, limit;

	//display the nav arrows by default
	$scope.showMonthNav = true;
	//hide the date-range filter
	$scope.showDateFilter = false;
	//toggle the date-range filter
	$scope.toggleDateFilter = function(){
		if($scope.showDateFilter === true){
			$scope.showDateFilter = false;
		} else {
			$scope.showDateFilter = true;
		}
	}

	if($location.path() === '/'){
		// if is home we show 10 elements starting from today
		var today = new Date();

		dateFrom = today;
		dateTo = new Date('2016-12-31');
		limit = 10;

	} else if($routeParams.TO){
		// if we have a date range defined
		dateFrom = $routeParams.FROM;
		dateTo = $routeParams.TO;
		//disable arrow navigation
		$scope.showMonthNav = false; 
		//title of the page displays the selected range
		$scope.dateTitle = 'Events from ' + dateFrom + ' to ' + dateTo; 
	} else {
		// else we get the events from the current month
		var currYear = parseInt($routeParams.YEAR);
		var currMonth = parseInt($routeParams.MONTH);

		var nextYear, nextMonth, prevYear, prevMonth;
		if(currMonth === 12){
			nextYear = currYear + 1;
			nextMonth = 1;
		} else {
			nextMonth = currMonth + 1;
		}
		if(currMonth === 1){
			prevYear = currYear - 1;
			prevMonth = 12;
		} else {
			prevMonth = currMonth - 1;
		}
		dateFrom = currYear + '-' + currMonth + '-1';

		dateTo = (nextYear || currYear) + '-' + (nextMonth || currMonth) + '-1';
		
		// display selected month on the page title
		function monthName(){
			var month = new Date(dateFrom).getMonth();
			var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
			return monthNames[month];
		};

		$scope.dateTitle = monthName() + ' ' + currYear;

		//set arrow navigation routes
		$scope.navRoutes = {
			routePrevMonth: '/#/calendar/'+ (prevYear || currYear) + '/' + (prevMonth || currMonth),
			routeNextMonth: '/#/calendar/'+ (nextYear || currYear) + '/' + (nextMonth || currMonth)
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

	
	// check if the user is logged in and prepare an array with the events they have already saved
	var user = $rootScope.user;
	$scope.user = user;

	var addedItems = [];
	if(user){
		User.get(user)
			.then(function(dataUser){
				var dataUser = dataUser.data[0];
				addedItems = dataUser.events
			});
	}
	
	// check if the event has been saved by the user to show or hide the Add to calendar button
	$scope.added = function(user, eventId){
		if(addedItems.indexOf(eventId) !== -1){
			return true; //hide
		} else {
			return false; //show
		}
		
	}

	$scope.addToCalendar = function(user, eventId){
		// add the event to the database
		User.addEvent(user, eventId)
			.then(function(){
				addedItems.push(eventId); // and store it in the saved events array
			});
	}
	
})
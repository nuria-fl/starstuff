angular.module('homeController', [])
	.controller('homeController', function($scope) {
			
		var today = new Date();
		var currYear = today.getFullYear();
		var currMonth = today.getMonth() + 1;
		//set the route of the SEE FULL CALENDAR button to the current month
		$scope.routeToCalendar = '/calendar/'+currYear+'/'+currMonth;

	});
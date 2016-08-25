angular.module('homeController', [])
	.controller('homeController', function($scope) {
			
		var today = new Date();
		var currYear = today.getFullYear();
		var currMonth = today.getMonth() + 1;

		$scope.routeToCalendar = '/#/calendar/'+currYear+'/'+currMonth;

	})
angular.module('homeController', ['ImageService'])
	.controller('homeController', function($scope, Image) {
			
		var today = new Date();
		var currYear = today.getFullYear();
		var currMonth = today.getMonth() + 1;
		//set the route of the SEE FULL CALENDAR button to the current month
		$scope.routeToCalendar = '/calendar/'+currYear+'/'+currMonth;

		Image.get()
			.then(function(data){
				console.log(data)
				$scope.images = data.data
			})
	});
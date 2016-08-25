angular.module('searchByDateController', [])
	.controller('searchByDateController', function($scope, $location){
		$scope.searchByDate = function(){
			var maxDate = $scope.dates.maxDate._d;
			var minDate = $scope.dates.minDate._d;

			var minYear = minDate.getFullYear();
			var minMonth = minDate.getMonth()+1;
			var minDay = minDate.getDate();

			var maxYear = maxDate.getFullYear();
			var maxMonth = maxDate.getMonth()+1;
			var maxDay = maxDate.getDate();

			var niceMinDate = minYear+'-' +minMonth +'-' + minDay;
			var niceMaxDate = maxYear+'-' +maxMonth +'-' + maxDay;

			$location.path('/calendar/range/'+niceMinDate+'/'+niceMaxDate)
			
		};
	})
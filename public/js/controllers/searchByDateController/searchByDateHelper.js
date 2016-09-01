function searchByDateHelper($scope, $location){
	this.searchByDate = function(){
		var maxDate = $scope.dates.maxDate;
		var minDate = $scope.dates.minDate;

		var minYear = minDate.getFullYear();
		var minMonth = minDate.getMonth()+1;
		var minDay = minDate.getDate();

		var maxYear = maxDate.getFullYear();
		var maxMonth = maxDate.getMonth()+1;
		var maxDay = maxDate.getDate();

		var niceMinDate = minYear+'-' +minMonth +'-' + minDay;
		var niceMaxDate = maxYear+'-' +maxMonth +'-' + maxDay;

		$location.path('/calendar/range/'+niceMinDate+'/'+niceMaxDate);
		
	};
}

module.exports = searchByDateHelper;
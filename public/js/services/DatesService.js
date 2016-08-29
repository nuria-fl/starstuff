angular.module('DatesService', [])
	.factory('Dates', [function() {
		return {
		    getMonth : function (year, month) {
				var dates = {}

				var currYear = parseInt(year);
				var currMonth = parseInt(month);

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

				dates.dateFrom = currYear + '-' + currMonth + '-1';
				dates.dateTo = (nextYear || currYear) + '-' + (nextMonth || currMonth) + '-1';
				dates.prevMonth = (prevYear || currYear) + '/' + (prevMonth || currMonth);
				dates.nextMonth = (nextYear || currYear) + '/' + (nextMonth || currMonth);

				return dates;
			},
			getMonthName : function(date){
				var month = new Date(date).getMonth();
				var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
				return monthNames[month];
			}
		};
	}]);
module.exports = 'DatesService';
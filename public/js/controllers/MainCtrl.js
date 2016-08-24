// public/js/controllers/MainCtrl.js
angular.module('MainCtrl', [])
	.run(function($location, $rootScope){
		$rootScope.$on("$routeChangeSuccess", function(currentRoute, previousRoute){
			$rootScope.isHome = $location.path() === '/';
			$rootScope.activePage = $location.path();
		});
		var easter_egg = new Konami(function() { 
			console.log('Konami code!')
		});

	})
	.controller('homeController', function($scope) {
		var today = new Date();
		var currYear = today.getFullYear();
		var currMonth = today.getMonth() + 1;

		$scope.range = {
			dateFrom: today,
			dateTo: new Date('2100-01-01')
		};

		$scope.routeToCalendar = '/#/calendar/'+currYear+'/'+currMonth;

	})
	.controller( 'eventsController' , function ( $scope, $rootScope, $routeParams, Event, $location, Icons, Categories, Visibility ) {

		$scope.showMonthNav = true;
		$scope.showDateFilter = false;

		$scope.toggleDateFilter = function(){
			if($scope.showDateFilter === true){
				$scope.showDateFilter = false;
			} else {
				$scope.showDateFilter = true;
			}
		}

		if($routeParams.TO){
			// if we have a date range defined
			$scope.showMonthNav = false;
			$scope.range = {
				dateFrom: new Date($routeParams.FROM),
				dateTo: new Date($routeParams.TO)
			};
			$scope.dateTitle = 'Events from ' + $routeParams.FROM + ' to ' + $routeParams.TO;
		} else {
			// else we get the current month
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
			var dateFrom = currYear + '-' + currMonth + '-1';

			var dateTo = (nextYear || currYear) + '-' + (nextMonth || currMonth) + '-1';
			
			$scope.range = {
				dateFrom: new Date(dateFrom),
				dateTo: new Date(dateTo)
			}

			function monthName(){
				var month = new Date(dateFrom).getMonth();
				var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
				return monthNames[month];
			};

			$scope.dateTitle = monthName() + ' ' + currYear;

			$scope.navRoutes = {
				routePrevMonth: '/#/calendar/'+ (prevYear || currYear) + '/' + (prevMonth || currMonth),
				routeNextMonth: '/#/calendar/'+ (nextYear || currYear) + '/' + (nextMonth || currMonth)
			};
		}		

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
			
		}

		

		$scope.iconVisibilityName = function(event){
			return Icons.getIconVisibility(event);
		};

		$scope.iconCategoryName = function(event){
			return Icons.getIconCat(event);
		};

		Event.get()
			.then( function( dataEvents ) {
				$scope.events = dataEvents.data;
			})
		
	})
	.controller('filterController', function($scope, Categories, Visibility){
		console.log($scope.$parent);
		$scope.categories = Categories.getCategories();
		$scope.visibility = Visibility.getVisibility();

		// selected categories
		$scope.$parent.selection = [];
		$scope.$parent.selectionVisibility = [];

		// helper method to get selected categories
		$scope.selectedCategories = function selectedCategories() {
			return filterFilter($scope.categories, { selected: true });
		};

		// watch categories for changes
		$scope.$watch('categories|filter:{selected:true}', function (nv) {
			$scope.$parent.selection = nv.map(function (category) {
			  return category.name;
			});
		}, true);
		$scope.$watch('visibility|filter:{selected:true}', function (nv) {
			$scope.$parent.selectionVisibility = nv.map(function (visibility) {
			  return visibility.name;
			});
		}, true);
		
		$scope.showFilterCat = false;
		$scope.showFilterVisibility = false;

		$scope.toggleFilterCat = function(){
			$scope.showFilterVisibility = false;
			if($scope.showFilterCat === true){
				$scope.showFilterCat = false;
			} else {
				$scope.showFilterCat = true;
			}
		}

		$scope.toggleFilterVisibility = function(){
			$scope.showFilterCat = false;
			if($scope.showFilterVisibility === true){
				$scope.showFilterVisibility = false;
			} else {
				$scope.showFilterVisibility = true;
			}
		}
	})
	.controller( 'galleryController' , function ( $scope ) {
		var gallery = [1,2,3,4,5,6,7,8,9];
		$scope.gallery = gallery;
	})
	.controller( 'singleEventController' , function ( $scope, $routeParams, Event, Icons ) {
		
		$scope.iconVisibilityName = function(event){
			return Icons.getIconVisibility(event);
		};

		$scope.iconCategoryName = function(event){
			return Icons.getIconCat(event);
		};

		var eventId = $routeParams.ID;
		Event.getOne( eventId )
			.then(function(dataEvent){
				$scope.event = dataEvent.data;
			})
		
	})
// public/js/controllers/MainCtrl.js
angular.module('MainCtrl', [])
	.run(function($location, $rootScope){
		$rootScope.$on("$routeChangeSuccess", function(currentRoute, previousRoute){
			$rootScope.isHome = $location.path() === '/';
			$rootScope.activePage = $location.path();
		});
	})
	.controller('homeController', function($scope) {
		$scope.dateFrom = new Date();
		$scope.dateTo = new Date('2100-01-01');
	})
	.filter("dateFilter", function() {
		return function(events, from, to) {
			var result = [];       
			events.forEach(function(elem, i){
				var eventDate = new Date(elem.date);
				if (eventDate > from && eventDate < to)  {
				    result.push(elem);
				}
			})
			           
			return result;
		};
	})
	.filter('selectedFilters', function() {

	    return function(events, selection) {
	    	if(selection.length){
	    		return events.filter(function(event) {

	    		    for (var i in event.category) {

	    		        if (selection.indexOf(event.category[i]) != -1 || selection.indexOf(event.visibility) != -1) {
	    		        	console.log(event)
	    		            return true;
	    		        }
	    		    }
	    		    return false;

	    		});
	    	} else {
	    		return events;
	    	}
	        
	    };
	})
	.controller( 'eventsController' , function ( $scope, Event ) {

		var today = new Date();
		var currYear = today.getFullYear();
		var currMonth = today.getMonth() + 1;
		var nextYear, nextMonth;
		if(currMonth === 12){
			nextYear = currYear + 1;
		} else {
			nextMonth = currMonth + 1;
		}
		var dateFrom = currYear + '-' + currMonth + '-1';
		var dateTo = (nextYear || currYear) + '-' + (nextMonth || currMonth) + '-1';

		$scope.dateFrom = new Date(dateFrom);
		$scope.dateTo = new Date(dateTo);

		$scope.categories = [
			{ name: 'Moon',    			selected: false },
			{ name: 'Sun',    			selected: false },
			{ name: 'Stars and planets',selected: false },
			{ name: 'Meteor showers',   selected: false },
			{ name: 'Comets',     		selected: false },
			{ name: 'Eclipses',    		selected: false },
			{ name: 'Mission Updates',	selected: false }
		];
		$scope.visibility = [
			{ name: 'to the naked eye',	selected: false },
			{ name: 'with binoculars',	selected: false },
			{ name: 'with telescope',	selected: false }
		];

		// selected categories
		$scope.selection = [];

		// helper method to get selected categories
		$scope.selectedCategories = function selectedCategories() {
			return filterFilter($scope.categories, { selected: true });
		};

		// watch categories for changes
		$scope.$watch('categories|filter:{selected:true}', function (nv) {
			$scope.selection = nv.map(function (category) {
			  return category.name;
			});
			console.log($scope.selection)
		}, true);
		$scope.$watch('visibility|filter:{selected:true}', function (nv) {
			$scope.selection = nv.map(function (visibility) {
			  return visibility.name;
			});
			console.log($scope.selection)
		}, true);

		Event.get()
			.then( function( dataEvents ) {
				$scope.events = dataEvents.data;
			})
		// var events = [
		// 	{
		// 		name: 'Mercury at greatest elongation east',
		// 		description: '',
		// 		date: new Date('2016-08-16T15:19:00'),
		// 		category: ['Stars and planets'],
		// 		visibility: 'to the naked eye'
		// 	},
		// 	{
		// 		name: 'Full Moon',
		// 		description: '',
		// 		date: new Date('2016-08-18T09:28'),
		// 		category: ['Moon'],
		// 		visibility: 'to the naked eye'
		// 	},
		// 	{
		// 		name: 'α–Cygnid meteor shower',
		// 		description: '',
		// 		date: new Date('2016-08-21'),
		// 		category: ['Meteor showers'],
		// 		visibility: 'to the naked eye'
		// 	},
		// 	{
		// 		name: 'Conjunction between the Moon and Uranus',
		// 		description: '',
		// 		date: new Date('2016-08-22T11:28'),
		// 		category: ['Stars and planets'],
		// 		visibility: 'with binoculars'
		// 	},
		// 	{
		// 		name: 'Conjunction between Mars and Saturn',
		// 		description: '',
		// 		date: new Date('2016-08-24T15:37'),
		// 		category: ['Stars and planets'],
		// 		visibility: 'to the naked eye'
		// 	},
		// 	{
		// 		name: 'Moon at Last Quarter',
		// 		description: '',
		// 		date: new Date('2016-08-25T03:42'),
		// 		category: ['Moon'],
		// 		visibility: 'to the naked eye'
		// 	},
		// 	{
		// 		name: 'Neptune at opposition',
		// 		description: '',
		// 		date: new Date('2016-09-02T16:23'),
		// 		category: ['Stars and planets'],
		// 		visibility: 'with telescope'
		// 	},
		// 	{
		// 		name: 'Conjunction between the Moon and Saturn',
		// 		description: '',
		// 		date: new Date('2016-09-09T16:23'),
		// 		category: ['Stars and planets', 'Moon'],
		// 		visibility: 'to the naked eye'
		// 	},
		// 	{
		// 		name: 'Piscid meteor shower',
		// 		description: '',
		// 		date: new Date('2016-09-09'),
		// 		category: ['Meteor showers'],
		// 		visibility: 'to the naked eye'
		// 	},
		// 	{
		// 		name: 'Moon at First Quarter',
		// 		description: '',
		// 		date: new Date('2016-09-09T11:50'),
		// 		category: ['Moon'],
		// 		visibility: 'to the naked eye'
		// 	},

		// ];
		
	})
	.controller( 'galleryController' , function ( $scope ) {
		var gallery = [1,2,3,4,5,6,7,8,9];
		$scope.gallery = gallery;
	})
	.controller( 'singleEventController' , function ( $scope, $routeParams, Event ) {
		
		var eventId = $routeParams.ID;
		Event.getOne( eventId )
			.then(function(dataEvent){
				$scope.event = dataEvent.data;
			})
		
	})
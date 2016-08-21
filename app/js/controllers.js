angular.module( 'controllers', [] )
	.run(function($location, $rootScope){
		$rootScope.$on("$routeChangeSuccess", function(currentRoute, previousRoute){
			$rootScope.isHome = $location.path() === '/';
		});
	})
	.controller( 'homeController' , function ( $scope ) {
		
	})
	.controller( 'eventsController' , function ( $scope ) {
		
		var events = [
			{
				id: 1,
				name: 'Mercury at greatest elongation east',
				date: new Date('2016-08-16T15:19:00'),
				category: 'Stars and planets',
				visibility: 'to the naked eye'
			},
			{
				id: 2,
				name: 'Full Moon',
				date: new Date('2016-08-18T09:28'),
				category: 'Moon',
				visibility: 'to the naked eye'
			},
			{
				id: 3,
				name: 'α–Cygnid meteor shower',
				date: new Date('2016-08-21'),
				category: 'Meteor showers',
				visibility: 'to the naked eye'
			},
			{
				id: 4,
				name: 'Conjunction between the Moon and Uranus',
				date: new Date('2016-08-22T11:28'),
				category: 'Stars and planets',
				visibility: 'with binoculars'
			},
			{
				id: 5,
				name: 'Conjunction between Mars and Saturn',
				date: new Date('2016-08-24T15:37'),
				category: 'Stars and planets',
				visibility: 'to the naked eye'
			},
			{
				id: 6,
				name: 'Moon at Last Quarter',
				date: new Date('2016-08-25T03:42'),
				category: 'Moon',
				visibility: 'to the naked eye'
			},
			{
				id: 7,
				name: 'Neptune at opposition',
				date: new Date('2016-09-02T16:23'),
				category: 'Stars and planets',
				visibility: 'with telescope'
			},
			{
				id: 8,
				name: 'Conjunction between the Moon and Saturn',
				date: new Date('2016-09-09T16:23'),
				category: ['Stars and planets', 'Moon'],
				visibility: 'to the naked eye'
			},
			{
				id: 9,
				name: 'Piscid meteor shower',
				date: new Date('2016-09-09'),
				category: 'Meteor showers',
				visibility: 'to the naked eye'
			},
			{
				id: 10,
				name: 'Moon at First Quarter',
				date: new Date('2016-09-09T11:50'),
				category: 'Moon',
				visibility: 'to the naked eye'
			},

		];

		$scope.events = events;
		
	})
	.controller( 'galleryController' , function ( $scope ) {
		var gallery = [1,2,3,4,5,6,7,8,9];
		$scope.gallery = gallery;
	})
	.controller( 'singleEventController' , function ( $scope, $routeParams ) {
		var events = [
			{
				id: 1,
				name: 'Mercury at greatest elongation east',
				date: new Date('2016-08-16T15:19:00'),
				category: 'Stars and planets',
				visibility: 'to the naked eye'
			},
			{
				id: 2,
				name: 'Full Moon',
				date: new Date('2016-08-18T09:28'),
				category: 'Moon',
				visibility: 'to the naked eye'
			},
			{
				id: 3,
				name: 'α–Cygnid meteor shower',
				date: new Date('2016-08-21'),
				category: 'Meteor showers',
				visibility: 'to the naked eye'
			},
			{
				id: 4,
				name: 'Conjunction between the Moon and Uranus',
				date: new Date('2016-08-22T11:28'),
				category: 'Stars and planets',
				visibility: 'with binoculars'
			},
			{
				id: 5,
				name: 'Conjunction between Mars and Saturn',
				date: new Date('2016-08-24T15:37'),
				category: 'Stars and planets',
				visibility: 'to the naked eye'
			},
			{
				id: 6,
				name: 'Moon at Last Quarter',
				date: new Date('2016-08-25T03:42'),
				category: 'Moon',
				visibility: 'to the naked eye'
			},
			{
				id: 7,
				name: 'Neptune at opposition',
				date: new Date('2016-09-02T16:23'),
				category: 'Stars and planets',
				visibility: 'with telescope'
			},
			{
				id: 8,
				name: 'Conjunction between the Moon and Saturn',
				date: new Date('2016-09-09T16:23'),
				category: ['Stars and planets', 'Moon'],
				visibility: 'to the naked eye'
			},
			{
				id: 9,
				name: 'Piscid meteor shower',
				date: new Date('2016-09-09'),
				category: 'Meteor showers',
				visibility: 'to the naked eye'
			},
			{
				id: 10,
				name: 'Moon at First Quarter',
				date: new Date('2016-09-09T11:50'),
				category: 'Moon',
				visibility: 'to the naked eye'
			},

		];

		var eventId = $routeParams.ID;

		var event = events.filter(function(elem){
			return elem.id === parseInt(eventId)
		})

		$scope.event = event[0];
	})
angular.module( 'controllers', [] )
	.run(function($location, $rootScope){
		$rootScope.$on("$routeChangeSuccess", function(currentRoute, previousRoute){
			$rootScope.isHome = $location.path() === '/';
		});
	})
	.controller( 'homeController' , function ( $scope ) {
		
		var events = [
			{
				name: 'Mercury at greatest elongation east',
				date: new Date('2016-08-16T15:19:00'),
				category: 'Stars and planets',
				visibility: 'to the naked eye'
			},
			{
				name: 'Full Moon',
				date: new Date('2016-08-18T09:28'),
				category: 'Moon',
				visibility: 'to the naked eye'
			},
			{
				name: 'α–Cygnid meteor shower',
				date: new Date('2016-08-21'),
				category: 'Meteor showers',
				visibility: 'to the naked eye'
			},
			{
				name: 'Conjunction between the Moon and Uranus',
				date: new Date('2016-08-22T11:28'),
				category: 'Stars and planets',
				visibility: 'with binoculars'
			},
			{
				name: 'Conjunction between Mars and Saturn',
				date: new Date('2016-08-24T15:37'),
				category: 'Stars and planets',
				visibility: 'to the naked eye'
			},
			{
				name: 'Moon at Last Quarter',
				date: new Date('2016-08-25T03:42'),
				category: 'Moon',
				visibility: 'to the naked eye'
			},
			{
				name: 'Neptune at opposition',
				date: new Date('2016-09-02T16:23'),
				category: 'Stars and planets',
				visibility: 'with telescope'
			},
			{
				name: 'Conjunction between the Moon and Saturn',
				date: new Date('2016-09-09T16:23'),
				category: ['Stars and planets', 'Moon'],
				visibility: 'to the naked eye'
			},
			{
				name: 'Piscid meteor shower',
				date: new Date('2016-09-09'),
				category: 'Meteor showers',
				visibility: 'to the naked eye'
			},
			{
				name: 'Moon at First Quarter',
				date: new Date('2016-09-09T11:50'),
				category: 'Moon',
				visibility: 'to the naked eye'
			},

		];

		$scope.events = events;
		
	})
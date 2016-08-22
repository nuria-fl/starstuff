// public/js/controllers/MainCtrl.js
angular.module('MainCtrl', [])
	.run(function($location, $rootScope){
		$rootScope.$on("$routeChangeSuccess", function(currentRoute, previousRoute){
			$rootScope.isHome = $location.path() === '/';
			$rootScope.activePage = $location.path();
			console.log($location.path())
		});
	})
	.controller('homeController', function($scope) {

	    

	})
	.controller( 'eventsController' , function ( $scope, Event ) {
		Event.get()
			.then( function( dataEvents ) {
				console.log(dataEvents.data)
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
		console.log('hi')
		Event.getOne( eventId )
			.then(function(dataEvent){

				console.log(dataEvent.data)

				$scope.event = dataEvent.data;
			})

		
	})
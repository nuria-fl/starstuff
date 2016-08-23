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
		$scope.dateFrom = new Date();
		$scope.dateTo = new Date('2100-01-01');
	})
	.controller( 'eventsController' , function ( $scope, Event, $location ) {

		// $scope.activePage = $location.path();

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
			{ 
				name: 'Moon',    			
				iconName: 'iconMoon',
				selected: false 
			},
			{ 
				name: 'Sun',
				iconName: 'iconSun',
				selected: false 
			},
			{ 
				name: 'Stars and planets',
				iconName: 'iconPlanets',
				selected: false 
			},
			{ 
				name: 'Meteor showers',   
				iconName: 'iconMeteorShower',
				selected: false 
			},
			{ 
				name: 'Comets', 
				iconName: 'iconComets',
				selected: false 
			},
			{ 
				name: 'Eclipses',
				iconName: 'iconEclipse',
				selected: false 
			},
			{ 
				name: 'Mission Updates',
				iconName: 'iconMissionUpdates',	
				selected: false 
			}
		];
		$scope.visibility = [
			{ 
				name: 'to the naked eye',
				iconName: 'iconEye',
				selected: false 
			},
			{ 
				name: 'with binoculars',	
				iconName: 'iconBinoculars',
				selected: false 
			},
			{ 
				name: 'with telescope',	
				iconName: 'iconTelescope',
				selected: false 
			}
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
		}, true);
		$scope.$watch('visibility|filter:{selected:true}', function (nv) {
			$scope.selection = nv.map(function (visibility) {
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

		Event.get()
			.then( function( dataEvents ) {
				$scope.events = dataEvents.data;
			})
		
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
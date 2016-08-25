angular.module('singleEventController', [])
	.controller( 'singleEventController' , function ( $scope, $routeParams, Event, Icons ) {
		
		$scope.iconVisibilityName = function(event){
			return Icons.getIconVisibility(event);
		};

		$scope.iconCategoryName = function(event){
			return Icons.getIconCat(event);
		};

		$scope.addToCalendar = function(user){
			alert('added to calendar '+user)
		}

		var eventId = $routeParams.ID;
		Event.getOne( eventId )
			.then(function(dataEvent){
				$scope.event = dataEvent.data;
			})
		
	});
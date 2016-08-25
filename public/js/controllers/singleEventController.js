angular.module('singleEventController', [])
	.controller( 'singleEventController' , function ( $scope, $routeParams, Event, Icons ) {
		
		var eventId = $routeParams.ID;

		Event.getOne( eventId )
			.then(function(dataEvent){
				$scope.event = dataEvent.data;
			})

		$scope.iconVisibilityName = function(event){
			if(event){
				return Icons.getIconVisibility(event);	
			}			
		};

		$scope.iconCategoryName = function(event){
			if(event){
				return Icons.getIconCat(event);
			}
		};

		$scope.addToCalendar = function(user){
			alert('added to calendar '+user);
		};
		
	});
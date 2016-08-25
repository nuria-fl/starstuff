angular.module('singleEventController', [])
	.controller( 'singleEventController' , function ( $scope, $rootScope, $routeParams, Event, User, Icons ) {
		
		//get event by the url parameter
		var eventId = $routeParams.ID;
		Event.getOne( eventId )
			.then(function(dataEvent){
				$scope.event = dataEvent.data;
			})

		// get icons to display
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

		// check if the user is logged in and prepare an array with the events they have already saved
		var user = $rootScope.user;
		// $scope.user = user;

		var addedItems = [];
		if(user){
			User.get(user)
				.then(function(dataUser){
					var dataUser = dataUser.data[0];
					addedItems = dataUser.events
				});
		}
		
		// check if the event has been saved by the user to show or hide the Add to calendar button
		$scope.added = function(){
			console.log(eventId)
			if(addedItems.indexOf(eventId) !== -1){
				return true; //hide
			} else {
				return false; //show
			}
			
		}

		$scope.addToCalendar = function(){
			// add the event to the database
			User.addEvent(user, eventId)
				.then(function(){
					addedItems.push(eventId); // and store it in the saved events array
				});
		}
		
	});
angular.module('singleEventController', ['AddedItemsService'])
	.controller( 'singleEventController' , function ( $scope, $rootScope, $routeParams, $sce, Event, User, Icons, AddedItems ) {
		
		//get event by the url parameter
		var eventId = $routeParams.ID;
		Event.getOne( eventId )
			.then(function(dataEvent){
				$scope.event = dataEvent.data;
			});

		// force render html from description to display links
		$scope.renderHtml = function(item){
			//force links to open in a new window
			var itemWithLinks = item.replace(new RegExp('<a href', 'g'), '<a target="_blank" href');
			return $sce.trustAsHtml(itemWithLinks);
		};

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

		// get user events (if user is logged in)
		var user = $rootScope.user;
		$scope.user = user;

		//initialize array to store added items
		var addedItems = [];
		// if we have a user logged in we retrieve their events and store them into the array
		if(user){
			User.get(user)
				.then(function(dataUser){
					var dataUser = dataUser.data[0];
					addedItems = dataUser.events;
				});
		}
		// check if the event has been saved by the user to show or hide the Add to calendar button
		$scope.added = function(){
			if(addedItems.indexOf(eventId) !== -1){
				return true; //hide
			} else {
				return false; //show
			}
			
		};
		$scope.addToCalendar = function(){
			// add the event to the database
			User.addEvent(user, eventId)
				.then(function(){
					addedItems.push(eventId); // and store it in the saved events array
				});
		};
	});
module.exports = 'singleEventController';
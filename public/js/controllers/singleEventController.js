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

		AddedItems.getAddedItems(user)
			.then(function(addedItemsResult){
				
				// check if the event has been saved by the user to show or hide the Add to calendar button
				$scope.added = function(){
					if(addedItemsResult.indexOf(eventId) !== -1){
						return true; //hide
					} else {
						return false; //show
					}
					
				};
				$scope.addToCalendar = function(){
					// add the event to the database
					User.addEvent(user, eventId)
						.then(function(){
							addedItemsResult.push(eventId); // and store it in the saved events array
						});
				};
				$scope.$apply();
			})
			.catch(function(){});

	});
function singleEventHelper ( $scope, $rootScope, $routeParams, $sce, Event, Image, User, Icons, Lightbox ) {
	
	//get event by the url parameter
	var eventId = $routeParams.ID;
	var scope = this;
	
	function getEvent(dataEvent){
		var today = (new Date()).getTime();
		this.info = dataEvent.data;
		this.passed = today > dataEvent.data.date;
	}

	function getEventImages(dataImages){
		this.images = dataImages.data;
	}

	Event.getOne( eventId )
		.then(getEvent.bind(scope));
	Image.getByEvent( eventId )
		.then(getEventImages.bind(scope));

	// force render html from description to display links
	this.renderHtml = function(item){
		//force links to open in a new window
		var itemWithLinks = item.replace(new RegExp('<a href', 'g'), '<a target="_blank" href');
		return $sce.trustAsHtml(itemWithLinks);
	};

	// get icons to display
	this.iconVisibilityName = function(event){
		if(event){
			return Icons.getIconVisibility(event);	
		}			
	};
	this.iconCategoryName = function(event){
		if(event){
			return Icons.getIconCat(event);
		}
	};

	// get user events (if user is logged in)
	var user = $rootScope.user;
	this.user = user;

	//initialize array to store added items
	var addedItems = [];
	// if we have a user logged in we retrieve their events and store them into the array
	if(user){
		User.get(user)
			.then((dataUser) => {
				var dataUser = dataUser.data[0];
				addedItems = dataUser.events;

			});
	}
	// check if the event has been saved by the user to show or hide the Add to calendar button
	this.added = function(){
		if(addedItems.indexOf(eventId) !== -1){
			return true; //hide
		} else {
			return false; //show
		}
		
	};
	this.addToCalendar = function(){
		// add the event to the database
		User.addEvent(user, eventId)
			.then(function(){
				addedItems.push(eventId); // and store it in the saved events array
			});
	};

	// open/close upload modal
	this.showModal = false;
	this.openModal = function(){
		this.showModal = true;
	}
	this.closeModal = function(){
		this.showModal = false
	}

	// images
	var imagesArr = [];
	if(this.images){
		this.images.forEach(function(elem, i){
			var imgObj = {};
			imgObj.url = 'img/uploaded/'+elem.route;
			console.log(imgObj.url)
			imagesArr.push(imgObj)
		})

		this.openLightboxModal = function (index) {
			console.log(imagesArr)
		    Lightbox.openModal(imagesArr, index);
		    return false
		};
		
	}
	
}
module.exports = singleEventHelper;
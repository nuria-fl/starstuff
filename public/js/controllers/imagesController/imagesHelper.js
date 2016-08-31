function imagesHelper(Image, Lightbox, $routeParams, $location) {		
	
	const scope = this;

	function loadImages(images){
		let imagesArr = [];
		
		images.forEach(function(elem, i){
			var imgObj = {};
			imgObj.url = 'img/uploaded/'+elem.route;
			imagesArr.push(imgObj);
		})

		return imagesArr;		
	}

	function getImages(dataImages){
		this.images = dataImages.data;
		let images = loadImages(this.images);
		this.openLightboxModal = function (index) {
		    Lightbox.openModal(images, index);
		    return false;
		};
	}

	// open/close upload modal
	this.showModal = false;

	this.openModal = function(){
		this.showModal = true;
	};
	this.closeModal = function(){
		this.showModal = false;
	};

	if($routeParams.ID){
		console.log('event')
		let eventId = $routeParams.ID;
		Image.getByEvent( eventId )
			.then(getImages.bind(scope));
	} else if($routeParams.USER){
		console.log('user page')
		let user = $routeParams.USER;
		Image.getByUser( user )
			.then(getImages.bind(scope));
	} else if($location === '/gallery'){
		Image.get()
			.then(getImages.bind(scope));
	} else {
		Image.get()
			.then(getImages.bind(scope));
	}
	
}

module.exports = imagesHelper;
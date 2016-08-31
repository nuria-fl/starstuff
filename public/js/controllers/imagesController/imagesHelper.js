function imagesHelper(Image, Lightbox, $routeParams) {		
	
	const eventId = $routeParams.ID;
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

	function getEventImages(dataImages){
		this.images = dataImages.data;
		let images = loadImages(this.images);
		this.openLightboxModal = function (index) {
		    Lightbox.openModal(images, index);
		    return false;
		};
	}

	Image.getByEvent( eventId )
		.then(getEventImages.bind(scope));

	// open/close upload modal
	this.showModal = false;

	this.openModal = function(){
		this.showModal = true;
	};
	this.closeModal = function(){
		this.showModal = false;
	};
}

module.exports = imagesHelper;
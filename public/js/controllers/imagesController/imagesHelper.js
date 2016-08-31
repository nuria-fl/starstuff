function imagesHelper(Image, Lightbox, $scope, $routeParams, $location) {		
	
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

	function getImagesGallery(dataImages){
		var orderedImages = dataImages.data.sort((a,b)=> a.dateUploaded < b.dateUploaded);

		$scope.images = [];
		$scope.imagesTotal = orderedImages;
		$scope.currentPage = 1;
		$scope.numPerPage = 9;
		$scope.maxSize = 5;
		
		$scope.$watch('currentPage + numPerPage', function() {
		    
		    let begin = (($scope.currentPage - 1) * $scope.numPerPage), 
		    	end = begin + $scope.numPerPage;

		    $scope.images = $scope.imagesTotal.slice(begin, end);

		    let images = loadImages($scope.images);

		    $scope.openLightboxModal = function (index) {
		        Lightbox.openModal(images, index);
		        return false;
		    };
		  });
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
		let eventId = $routeParams.ID;
		Image.getByEvent( eventId )
			.then(getImages.bind(scope));
	} else if($routeParams.USER){
		let user = $routeParams.USER;
		Image.getByUser( user )
			.then(getImages.bind(scope));
	} else if($location.path() === '/gallery'){
		Image.get()
			.then(getImagesGallery.bind(scope));
	} else {
		Image.get()
			.then(getImages.bind(scope));
	}
	
}

module.exports = imagesHelper;
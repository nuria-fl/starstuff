function homeHelper(Image) {		
	var today = new Date();
	var currYear = today.getFullYear();
	var currMonth = today.getMonth() + 1;
	var scope = this;
	//set the route of the SEE FULL CALENDAR button to the current month
	this.routeToCalendar = '/calendar/'+currYear+'/'+currMonth;

	function getImages(dataImages){
		this.images = dataImages.data;
		console.log(dataImages.data)
	}
	Image.get()
		.then(getImages.bind(scope));	

}

// homeHelper.prototype.getImages = function(Image) {
	
// 	Image.get()
// 		.then(function(data){
// 			console.log(data)
// 			return data.data
// 		})
// }

module.exports = homeHelper;
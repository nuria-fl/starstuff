function homeHelper(Image) {		
	var today = new Date();
	var currYear = today.getFullYear();
	var currMonth = today.getMonth() + 1;
	var scope = this;
	//set the route of the SEE FULL CALENDAR button to the current month
	this.routeToCalendar = '/calendar/'+currYear+'/'+currMonth;

	Image.get()
		.then(this.getImages.bind(scope));	

}

homeHelper.prototype.getImages = function(dataImages) {
	this.images = dataImages.data;
}

module.exports = homeHelper;
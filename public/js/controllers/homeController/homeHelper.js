function homeHelper(Image) {		
	var today = new Date();
	var currYear = today.getFullYear();
	var currMonth = today.getMonth() + 1;
	//set the route of the SEE FULL CALENDAR button to the current month
	this.routeToCalendar = '/calendar/'+currYear+'/'+currMonth;


	// this.images = 

}

homeHelper.prototype.getImages = function() {
	return moment('2012 July', 'YYYY MMM', 'en');
	// Image.get()
		// 	.then(function(data){
		// 		console.log(data)
		// 		return data.data
		// 	})
}

module.exports = homeHelper;
const runApp = require('./run'); 
const homeCtrl = require('./homeController'); 
const eventsCtrl = require('./eventsController'); 
const searchByDateCtrl = require('./searchByDateController'); 
const filterCtrl = require('./filterController'); 
const singleEventCtrl = require('./singleEventController'); 
const loginCtrl = require('./loginController'); 
const profileCtrl = require('./profileController'); 
const uploadCtrl = require('./uploadController'); 
const imagesCtrl = require('./imagesController'); 

angular.module('MainCtrl', 
	[
		homeCtrl, 
		eventsCtrl,
		searchByDateCtrl,
		filterCtrl,
		singleEventCtrl,
		loginCtrl,
		profileCtrl,
		uploadCtrl,
		imagesCtrl
	])
	.run(runApp)

module.exports = 'MainCtrl';
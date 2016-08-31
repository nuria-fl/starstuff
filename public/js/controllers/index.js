var runApp = require('./run'); 
var homeCtrl = require('./homeController'); 
var eventsCtrl = require('./eventsController'); 
var searchByDateCtrl = require('./searchByDateController'); 
var filterCtrl = require('./filterController'); 
var singleEventCtrl = require('./singleEventController'); 
var loginCtrl = require('./loginController'); 
var profileCtrl = require('./profileController'); 
var uploadCtrl = require('./uploadController'); 

angular.module('MainCtrl', 
	[
		homeCtrl, 
		eventsCtrl,
		searchByDateCtrl,
		filterCtrl,
		singleEventCtrl,
		loginCtrl,
		profileCtrl,
		uploadCtrl
	])
	.run(runApp)

module.exports = 'MainCtrl';
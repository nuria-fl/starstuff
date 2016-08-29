var DatesService = require('../../services/DatesService');
var eventsHelper = require('./eventsHelper');

angular.module('eventsController', [DatesService])
	.controller( 'eventsController', eventsHelper);

module.exports = 'eventsController';
// app/routes.js
var Event = require('../models/event');
var User = require('../models/user');
var getEventsByDateRange = require('./helpers/getEventsByDateRange');
var getEventById = require('./helpers/getEventById');
var getUser = require('./helpers/getUser');
var addEvent = require('./helpers/addEvent');
var removeEvent = require('./helpers/removeEvent');
var loginUser = require('./helpers/loginUser');
var loadAngular = require('./helpers/loadAngular');

module.exports = function(app) {

	// api calls
	app.get('/api/events/range/:from/:to', getEventsByDateRange);
	app.get('/api/event/:id', getEventById);
	app.get('/api/user/:username', getUser);
	app.post('/api/user/:username/add-event/:eventId', addEvent);
	app.post('/api/user/:username/remove-event/:eventId', removeEvent);

	// Log users
	app.post('/login', loginUser);
	
	// frontend routes
	app.get('*', loadAngular);

};
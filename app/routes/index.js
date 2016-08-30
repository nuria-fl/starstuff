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
var getImages = require('./helpers/getImages');
var getImageById = require('./helpers/getImageById');
var getUserImages = require('./helpers/getUserImages');
var getEventImages = require('./helpers/getEventImages');

// Requires multiparty 
multiparty = require('connect-multiparty'),
multipartyMiddleware = multiparty(),

// Requires controller
UserController = require('./helpers/uploadPic');


module.exports = function(app) {

	// api calls
	app.get('/api/events/range/:from/:to', getEventsByDateRange);
	app.get('/api/event/:id', getEventById);
	app.get('/api/user/:username', getUser);
	app.post('/api/user/:username/add-event/:eventId', addEvent);
	app.post('/api/user/:username/remove-event/:eventId', removeEvent);
	app.post('/api/user/uploads', multipartyMiddleware, UserController.uploadFile);
	app.get('/api/user/:username/images', getUserImages);
	app.get('/api/images', getImages);
	app.get('/api/images/event/:eventId', getEventImages);
	app.get('/api/image/:id', getImageById);

	// Log users
	app.post('/login', loginUser);
	
	// frontend routes
	app.get('*', loadAngular);

};
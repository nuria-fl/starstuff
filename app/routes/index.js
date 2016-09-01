// helpers
const Event = require('../models/event');
const User = require('../models/user');
const getEventsByDateRange = require('./helpers/getEventsByDateRange');
const getEventById = require('./helpers/getEventById');
const getUser = require('./helpers/getUser');
const addEvent = require('./helpers/addEvent');
const removeEvent = require('./helpers/removeEvent');
const loginUser = require('./helpers/loginUser');
const loadAngular = require('./helpers/loadAngular');
const getImages = require('./helpers/getImages');
const getImageById = require('./helpers/getImageById');
const getUserImages = require('./helpers/getUserImages');
const getEventImages = require('./helpers/getEventImages');
const uploadPic = require('./helpers/uploadPic');
// Middlewares
const multiparty = require('connect-multiparty');
const multipartyMiddleware = multiparty();

module.exports = function(app) {

	// api calls
	app.get('/api/events/range/:from/:to', getEventsByDateRange);
	app.get('/api/event/:id', getEventById);
	app.get('/api/user/:username', getUser);
	app.post('/api/user/:username/add-event/:eventId', addEvent);
	app.post('/api/user/:username/remove-event/:eventId', removeEvent);
	app.post('/api/user/uploads', multipartyMiddleware, uploadPic.uploadFile);
	app.get('/api/user/:username/images', getUserImages);
	app.get('/api/images', getImages);
	app.get('/api/images/event/:eventId', getEventImages);
	app.get('/api/image/:id', getImageById);

	// Log users
	app.post('/login', loginUser);
	
	// frontend routes
	app.get('*', loadAngular);

};
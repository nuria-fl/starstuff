// app/routes.js

var Event = require('../models/event');
var User = require('../models/user');
var getEventsByDateRange = require('./helpers/getEventsByDateRange');
var getEventById = require('./helpers/getEventById');
var getUser = require('./helpers/getUser');
var addEvent = require('./helpers/addEvent');

	module.exports = function(app) {

		// api calls	===========================================================

		app.get('/api/events/range/:from/:to', getEventsByDateRange);

		app.get('/api/event/:id', getEventById);

		app.get('/api/user/:username', getUser);

		app.post('/api/user/:username/add-event/:eventId', addEvent);

		// Log users		=========================================================
		app.post('/login', function(req, res) {
			
			var username = req.body.username;
			var password = req.body.password;
			
			User.find({
				username: username,
				password: password
			}, function(err, user) {
				if(user.length > 0){
					res.cookie('userCookie', user[0].username);
					res.redirect('/user/'+user[0].username)
				} else {
					res.redirect('/login/error')
				}
				// if there is an error retrieving, send the error. 
								// nothing after res.send(err) will execute
				if (err)
					res.send(err);	
			});
		});
		
		// frontend routes =========================================================
		// route to handle all angular requests
		app.get('*', function(req, res) {
			res.sendfile('./public/views/index.html'); // load our public/index.html file
		});

	};

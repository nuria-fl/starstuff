// app/routes.js

// grab the event model we just created
var Event = require('./models/event');

	module.exports = function(app) {

		// server routes ===========================================================
		// handle things like api calls
		// authentication routes

		// sample api route
		app.get('/api/events', function(req, res) {
			// use mongoose to get all events in the database
			Event.find(function(err, events) {

				// if there is an error retrieving, send the error. 
								// nothing after res.send(err) will execute
				if (err)
					res.send(err);

				res.json(events); // return all events in JSON format
			});
		});

		app.get('/api/event/:id', function(req, res) {
			// use mongoose to get all events in the database
			var eventId = req.params.id;
			Event.findById(eventId, function(err, events) {

				// if there is an error retrieving, send the error. 
								// nothing after res.send(err) will execute
				if (err)
					res.send(err);

				res.json(events); // return all events in JSON format
			});
		});

		// route to handle creating goes here (app.post)
		// route to handle delete goes here (app.delete)

		// frontend routes =========================================================
		// route to handle all angular requests
		app.get('*', function(req, res) {
			res.sendfile('./public/views/index.html'); // load our public/index.html file
		});

	};

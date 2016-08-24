// app/routes.js

// grab the event model we just created
var Event = require('./models/event');

	module.exports = function(app) {

		// server routes ===========================================================
		
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

		app.get('/api/events/range/:from/:to', function(req, res) {
			
			var from = new Date(req.params.from);
			var to = new Date(req.params.to);
			var fromTimestamp = from.getTime();
			var toTimestamp = to.getTime();
			var lim = 0;
			if(req.query.limit){
				lim = parseInt(req.query.limit)
			}
			Event.find({
				date: {"$gt": fromTimestamp, "$lt": toTimestamp}
			}).limit(lim).exec(function(err, events) {
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

		
		// frontend routes =========================================================
		// route to handle all angular requests
		app.get('*', function(req, res) {
			res.sendfile('./public/views/index.html'); // load our public/index.html file
		});

	};

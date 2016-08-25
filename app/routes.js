// app/routes.js

// grab the event model we just created
var Event = require('./models/event');
var User = require('./models/user');

	module.exports = function(app) {

		// server routes ===========================================================

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
			
			var eventId = req.params.id;
			Event.findById(eventId, function(err, events) {

				if (err)
					res.send(err);

				res.json(events);
			});
		});

		app.post('/login', function(req, res) {
			
			var username = req.body.username;
			var password = req.body.password;
			
			User.find({
				username: username,
				password: password
			}, function(err, user) {
				console.log(user);
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

		app.get('/api/user/:username', function(req, res) {
			var username = req.params.username;
			User.find({username: username}, function(err, user) {
				if (err)
					res.send(err);

				res.json(user);
			});
		});

		app.post('/api/user/:username/add-event/:eventId', function(req, res) {
			var username = req.params.username;
			var eventId = req.params.eventId;
			User.update(
				{
					username: username
				}, {
					$addToSet: {events: eventId}
				}).exec(function(err, user) {
				if (err)
					res.send(err);

				res.redirect('/user/'+username);
			});
		});
		
		// frontend routes =========================================================
		// route to handle all angular requests
		app.get('*', function(req, res) {
			res.sendfile('./public/views/index.html'); // load our public/index.html file
		});

	};

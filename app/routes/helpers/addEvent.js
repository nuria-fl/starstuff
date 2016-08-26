var User = require('../../models/user');

function addEvent(req, res) {
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

		res.end();
	});
}
module.exports = addEvent;
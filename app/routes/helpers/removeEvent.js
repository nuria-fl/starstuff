var User = require('../../models/user');

function removeEvent(req, res) {
	var username = req.params.username;
	var eventId = req.params.eventId;
	
	User.update(
		{
			username: username
		}, {
			$pull: {events: eventId}
		}).exec(function(err, user) {

		if (err)
			res.send(err);

		res.end();
	});
}
module.exports = removeEvent;
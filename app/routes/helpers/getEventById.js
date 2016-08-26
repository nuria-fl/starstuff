var Event = require('../../models/event');

function getEventById(req, res) {
			
	var eventId = req.params.id;
	Event.findById(eventId, function(err, events) {

		if (err)
			res.send(err);

		res.json(events);
	});
}

module.exports = getEventById;
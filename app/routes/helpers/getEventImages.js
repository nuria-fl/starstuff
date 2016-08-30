var Image = require('../../models/image');

function getEventImages (req, res) {
	var eventId = req.params.eventId;
	Image.find({ 'event._id': eventId } ).exec(function(err, images) {
		if (err)
			res.send(err);
		res.json(images); // return all events in JSON format
	});
}

module.exports = getEventImages;
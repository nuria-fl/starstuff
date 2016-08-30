var Image = require('../../models/image');
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

function getEventImages (req, res) {
	var eventId = req.params.eventId;
	Image.find({ 'event[0]._id': ObjectId(eventId) } ).exec(function(err, images) {
		if (err)
			res.send(err);
		res.json(images); // return all events in JSON format
	});
}

module.exports = getEventImages;
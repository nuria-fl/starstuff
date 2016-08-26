var Event = require('../../models/event');

function getEventsByDateRange (req, res) {
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
}

module.exports = getEventsByDateRange;
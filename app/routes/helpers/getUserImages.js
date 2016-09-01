var Image = require('../../models/image');

function getUserImages (req, res) {
	var username = req.params.username;
	console.log(username)
	Image.find(
		{ 'username': username } 
	).exec(function(err, images) {
		// if there is an error retrieving, send the error. 
						// nothing after res.send(err) will execute
		if (err)
			res.send(err);
	
		res.json(images); // return all events in JSON format
	});
}

module.exports = getUserImages;
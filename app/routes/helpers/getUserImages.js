var Image = require('../../models/image');

function getUserImages (req, res) {
	var username = req.params.username;
	
	Image.find(
		{ 'username': username } 
	).exec(function(err, events) {
		// if there is an error retrieving, send the error. 
						// nothing after res.send(err) will execute
		if (err)
			res.send(err);
		// var images = []
		// events.forEach(function(elem, i){
		// 	elem.images.forEach(function(elem, i){
		// 		if(elem.username === username){
		// 			images.push(elem)
		// 		}
		// 	})
		// })
		res.json(events); // return all events in JSON format
	});
}

module.exports = getUserImages;
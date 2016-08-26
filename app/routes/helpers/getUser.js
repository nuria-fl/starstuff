var User = require('../../models/user');

function getUser(req, res) {
	var username = req.params.username;
	User.find({username: username}, function(err, user) {
		if (err)
			res.send(err);

		res.json(user);
	});
}
module.exports = getUser;
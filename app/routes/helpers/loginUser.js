var User = require('../../models/user');

function loginUser(req, res) {	
	var username = req.body.username;
	var password = req.body.password;
	
	User.find({
		username: username,
		password: password
	}, function(err, user) {
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
}
module.exports = loginUser;
var User = require('../../models/user');
var jwt  = require('jsonwebtoken');

function loginUser(secret, req, res) {	

	var username = req.body.username;
	var password = req.body.password;
	
	User.findOne({
		username: username,
		password: password
	}, function(err, user) {
		if(user){
			var userWithoutPass = {
				_id: user._id,
				username: user.username,
				events: user.events
			};
			// res.cookie('userCookie', user[0].username);
			var token = jwt.sign(userWithoutPass, secret, {
	        	expiresIn : 60*60*24 // expires in 24 hours
	        });

	        // return the information including token as JSON
           res.json({
             success: true,
             message: 'Enjoy your token!',
             token: token
           });
			// res.redirect('/user/'+user.username)
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
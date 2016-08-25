// app/models/user.js
// grab the mongoose module
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	username: String,
	password: String,
	events: [{ type: Schema.Types.ObjectId, ref: 'Event' }]
});

var User = mongoose.model('User', userSchema);

// module.exports allows us to pass this to other files when it is called
module.exports = User;
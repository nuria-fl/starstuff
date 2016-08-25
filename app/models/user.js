var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	username: String,
	password: String,
	events: [{ type: Schema.Types.ObjectId, ref: 'Event' }] // reference to events by objectID
});

var User = mongoose.model('User', userSchema);

module.exports = User;
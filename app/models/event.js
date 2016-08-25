var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var eventSchema = new Schema({
	originId: String,
	name: String,
	link: String,
	description: [String],
	date: Number, // date in timestamp format
	category: [String],
	visibility: String,
});

var Event = mongoose.model('Event', eventSchema);
module.exports = Event;
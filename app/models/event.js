var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var imageSchema = require('./image');

var eventSchema = new Schema({
	originId: String,
	name: String,
	link: String,
	description: [String],
	date: Number, // date in timestamp format
	category: [String],
	visibility: String,
	images: [imageSchema]
});

var Event = mongoose.model('Event', eventSchema);
module.exports = Event;
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var imageSchema = new Schema({
	title: String,
	route: String,
	dateUploaded: Number,
	contentType: String,
	userId: { type: Schema.Types.ObjectId, ref: 'User' }, // reference to event
	username: String,
	// event: [{
	// 		id: { type: Schema.Types.ObjectId, ref: 'Event' }, // reference to event
	// 		name: String,
	// 		date: Number, // date in timestamp format
	// 		category: [String]
	// 	}]
});

// var Image = mongoose.model('Image', imageSchema);

module.exports = imageSchema;
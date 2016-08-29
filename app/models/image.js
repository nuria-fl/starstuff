var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var imageSchema = new Schema({
	title: String,
	img: { data: Buffer, contentType: String },
	user: String, // reference to user
	event: [{
			id: { type: Schema.Types.ObjectId, ref: 'Event' }, // reference to event
			name: String,
			date: Number, // date in timestamp format
			category: [String]
		}]
});

var Image = mongoose.model('Image', imageSchema);

module.exports = Image;
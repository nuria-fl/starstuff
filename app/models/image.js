var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var imageSchema = new Schema({
	title: String,
	img: { data: Buffer, contentType: String },
	user: String, // reference to user
	eventId: { type: Schema.Types.ObjectId, ref: 'Event' } // reference to event
});

var Image = mongoose.model('Image', imageSchema);

module.exports = Image;
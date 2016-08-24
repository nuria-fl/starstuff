// app/models/event.js
// grab the mongoose module
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var eventSchema = new Schema({
	originId: String,
	name: String,
	link: String,
	description: String,
	date: Number,
	category: [String],
	visibility: String,
});

// body:   String,
// comments: [{ body: String, date: Date }],
// date: { type: Date, default: Date.now },
// hidden: Boolean,
// meta: {
//   votes: Number,
//   favs:  Number
// }

var Event = mongoose.model('Event', eventSchema);
// define our event model
// module.exports allows us to pass this to other files when it is called
module.exports = Event;
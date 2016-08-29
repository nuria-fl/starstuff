var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var imageSchema = new Schema({
	title: String,
	img: { data: Buffer, contentType: String }
});

var Image = mongoose.model('Image', imageSchema);

module.exports = Image;
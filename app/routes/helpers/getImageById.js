var Image = require('../../models/image');

function getImageById (req, res, next) {
	var imageId = req.params.id;
	Image.findById(imageId, function (err, doc) {
		if (err) return next(err);
		// res.contentType(doc.img.contentType);
		// res.send(doc.img.data);
		var formatted = {};
		formatted.title = 'title';
		var string = doc.img.data.toString('base64')
		formatted.img = string;
		res.json(formatted);
	});
}

module.exports = getImageById;
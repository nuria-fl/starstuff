var Image = require('../../models/image');

function getImageById (req, res, next) {
	var imageId = req.params.id;
	Image.findById(imageId, function (err, doc) {
		if (err) return next(err);
		res.contentType(doc.img.contentType);
		res.send(doc.img.data);
	});
}

module.exports = getImageById;
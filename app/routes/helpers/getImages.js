var Image = require('../../models/image');

function getImages (req, res) {
	Image.find().limit(9).exec(function (err, images) {
			if (err) return next(err);
			
			res.json(images);
		});
}

module.exports = getImages;
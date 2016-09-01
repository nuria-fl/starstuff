var Image = require('../../models/image');

function getImages (req, res) {
	var lim = req.query.limit || 0;
	Image.find().sort({dateUploaded: -1}).limit(lim).exec(function (err, images) {
			if (err) return next(err);
			
			res.json(images);
		});
}

module.exports = getImages;
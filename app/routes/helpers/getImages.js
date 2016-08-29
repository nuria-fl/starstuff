var Image = require('../../models/image');

function getImages (req, res) {
	Image.find(function (err, doc) {
		if (err) return next(err);
		var base = [];
		doc.forEach(function(elem){
			var base64 = (elem.img.data.toString('base64'));
			
			base.push(base64);
		
		})
		
		res.send(base);

		// res.contentType(doc.img.contentType);
		// res.send(doc.img.data);
	});
}

module.exports = getImages;
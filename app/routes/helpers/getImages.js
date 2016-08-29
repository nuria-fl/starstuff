var Image = require('../../models/image');

function getImages (req, res) {
	Image.find(function (err, doc) {
		if (err) return next(err);
		var formattedArr = [];
		doc.forEach(function(elem, i){
			var imgObj = {};
			var base64img = elem.img.data.toString('base64');
			imgObj.title = 'title';
			imgObj.user = elem.user;
			imgObj.img = base64img;
			formattedArr.push(imgObj);
		})
		res.json(formattedArr);
	});
}

module.exports = getImages;
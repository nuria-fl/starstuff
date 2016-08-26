function loadAngular(req, res) {
	res.sendfile('./public/views/index.html'); // load our public/index.html file
}
module.exports = loadAngular;
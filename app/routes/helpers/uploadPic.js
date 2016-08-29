var fs = require('fs');
var Image = require('../../models/image');
var bodyParser = require('body-parser');

UserController = function() {};

UserController.prototype.uploadFile = function(req, res) {
    // We are able to access req.files.file thanks to 
    // the multiparty middleware
    var file = req.files.file;
    
    console.log(req.body);
    console.log(file.type);

    var img = new Image;

    img.user = req.body.username;
    img.eventId = req.body.event;
    img.img.data = fs.readFileSync(file.path);
    img.img.contentType = 'image/png';
    img.save(function (err, img) {
      if (err) throw err;
      console.log('saved img to mongo');
    });
}

module.exports = new UserController();
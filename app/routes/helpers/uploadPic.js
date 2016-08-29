var fs = require('fs');
var Image = require('../../models/image');
// img path
var imgPath = '/';
UserController = function() {};

UserController.prototype.uploadFile = function(req, res) {
    // We are able to access req.files.file thanks to 
    // the multiparty middleware
    var file = req.files.file;
    
    console.log(file);
    console.log(file.type);

    var img = new Image;

    
    var buffer = fs.readFileSync(file.path);
    img.img.data = buffer.toString('base64');
    console.log(buffer.toString('base64'))
    img.img.contentType = 'image/png';
    img.save(function (err, img) {
      if (err) throw err;
      console.log('saved img to mongo '+img);
    });
}

module.exports = new UserController();
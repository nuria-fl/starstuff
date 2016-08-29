var fs = require('fs');
var Image = require('../../models/image');
var bodyParser = require('body-parser');

ImageController = function() {};

var bl = require('bl');

ImageController.prototype.uploadFile = function(req, res) {
    // We are able to access req.files.file thanks to the multiparty middleware    
    var file = req.files.file;
    console.log(file)
    var timestamp = (new Date()).getTime();
    var img = new Image;
    img.route = timestamp+file.originalFilename;
    img.user = req.body.username;
    img.event = req.body.event;
    img.contentType = file.type;
    
    //upload file to our folder
    fs.createReadStream(file.path).pipe(bl(function (err, data) {
        
        var filepath = './public/img/uploaded/'+img.route;
        
        fs.appendFile(filepath, data, (err) => {
          if (err) throw err;
          console.log('The "data to append" was appended to file!');
        });
        
    }));

    
    img.save(function (err, img) {
      if (err) throw err;
      console.log('saved img to mongo');
      res.redirect(req.get('referer'));
    });
}

module.exports = new ImageController();
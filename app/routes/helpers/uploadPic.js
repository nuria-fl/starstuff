var fs = require('fs');
var Event = require('../../models/event');
var bodyParser = require('body-parser');

ImageController = function() {};

var bl = require('bl');

ImageController.prototype.uploadFile = function(req, res) {
    // We are able to access req.files.file thanks to the multiparty middleware    
    var eventId = req.body.eventId;
    var file = req.files.file;
    var timestamp = (new Date()).getTime();

    var img = {};
    img.title = req.body.title;
    img.dateUploaded = timestamp;
    img.route = timestamp+file.originalFilename;
    img.user = req.body.username;
    img.event = req.body.event;
    img.contentType = file.type;
    
    //upload file to our folder
    fs.createReadStream(file.path).pipe(bl(function (err, data) {
        
        var filepath = './public/img/uploaded/'+img.route;
        
        fs.appendFile(filepath, data, (err) => {
          if (err) throw err;
          // store it in the db
          Event.findByIdAndUpdate(eventId, 
              {
                  $addToSet: {images: img}
              },
              function (err, data) {
                  if (err) return handleError(err);
                  res.redirect(req.get('referer'));
              }
          );
          console.log('The file has been saved!');

        });
        
    }));
}

module.exports = new ImageController();
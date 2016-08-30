var fs = require('fs');
// var Event = require('../../models/event');
var Image = require('../../models/image');
var bodyParser = require('body-parser');

ImageController = function() {};

var bl = require('bl');

ImageController.prototype.uploadFile = function(req, res) {
    // We are able to access req.files.file thanks to the multiparty middleware    
    var eventId = req.body.eventId;
    var file = req.files.file;
    var timestamp = (new Date()).getTime();

    var img = new Image;
    img.title = req.body.title;
    img.dateUploaded = timestamp;
    img.route = timestamp+file.originalFilename;
    img.username = req.body.username;
    img.event = req.body.event;
    img.contentType = file.type;

    // console.log(req.body.event)
    
    //upload file to our folder
    fs.createReadStream(file.path).pipe(bl(function (err, data) {
        
        var filepath = './public/img/uploaded/'+img.route;
        
        fs.appendFile(filepath, data, (err) => {
          if (err) throw err;
          // store it in the db
          img.save(function (err, img) {
            if (err) throw err;
          });
          // Event.findByIdAndUpdate(eventId, 
          //     {
          //         $addToSet: {images: img}
          //     },
          //     function (err, data) {
          //         if (err) return handleError(err);
                  
          //     }
          // );
          res.status(200).send('The file has been saved!');
          console.log('The file has been saved!');
        });
        
    }));

}

module.exports = new ImageController();
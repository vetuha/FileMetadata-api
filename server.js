var express = require('express');
var fs = require('fs');
var path = require('path');
var multer  = require('multer');

var upload = multer({ 
    dest: 'uploads/',
    filename: function(req, file, cb) {
        cb(null, Date.now());
    }}).single('testFile');

var app = express();

app.set('port', (process.env.PORT || 8080));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.route('/').get(function(req, res) {res.render('index');});

 
app.post('/getfilesize', function (req, res) {
  upload(req, res, function (err) {
    if (err) {
      console.error(err);
    }
    var result = { name:req.file.originalname, size: req.file.size}
    
    var filePath = "./uploads/" + req.file.filename; 
    fs.unlinkSync(filePath);
    
    res.send(result);
  })
})


app.get("*", function(request, response) {
     response.end("404!");
  });

var port = app.get('port');
  
app.listen(port, function() {
    console.log('filemetadata-api app listening on port ' + port);
});


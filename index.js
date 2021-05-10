const express = require("express");
var formidable = require('formidable');
var fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var session = require('express-session');


const course = require('./routes/course');
const test = require('./routes/test');
const content = require('./routes/content');

mongoose.connect('mongodb://localhost/peakmerit')
    .then(() => console.log('Connected to MongoDB..'))
    .catch(err => console.err('Could not connect to MongoDB...', err.message));

const app = express();

app.set('views', './views');
app.set('view engine', 'ejs');
app.use(session(({secret: 'shhh'})));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/course', course);
app.use('/test', test);
app.use('/content', content);

app.get('/', (req, res, next) => {
    /*res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<form action="" method="post" enctype="multipart/form-data">');
    res.write('<input type="file" name="filetoupload"><br>');
    res.write('<input type="submit">');
    res.write('</form>');*/
    let images = getImagesFromDir(path.join(__dirname, 'public'));
    console.log('In Path : ' +  images);
    res.render('index.ejs', {title: 'Demo App', imgName : images, headData: 'Welcome to E-Learning Portal!'});
    //res.sendFile(__dirname+'/public/2.PNG');
    /*fs.readdir('./public/', (err, files) => {
        if(err) { throw err; }
        files.forEach(file => {
            res.write('<img src="/public/'+file+'"></img>');
            console.log(file);
        });
    });*/

    //app.use(express.static(__dirname + 'public'));

    //res.sendFile(__dirname, '')
    //return res.end();
});

app.post('/', (req, res, next) =>{
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      var oldpath = files.filetoupload.path;
      console.log('Old Path : ' + oldpath);
      var newpath = './public/' + files.filetoupload.name;
      console.log('New Path : '+ newpath);
      fs.readFile(oldpath, function (err, data) {
        if (err) throw err;
        console.log('File read!');

        // Write the file
        fs.writeFile(newpath, data, function (err) {
            if (err) throw err;
            //res.writeContinue('File uploaded and moved!');
            res.redirect('back');
            
            //alert('File Uploaded!');
            //res.end();
            console.log('File written!');
        });

        // Delete the file
        fs.unlink(oldpath, function (err) {
            if (err) throw err;
            console.log('File deleted!');
        });
    });
    });
});

function getImagesFromDir(filepath){
    let allImages = [];
    //fs.readdir(filepath, (err, files) => {
        //if(err) { throw err; }
        
        files = fs.readdirSync(filepath)

        files.forEach(file => {
            allImages.push(file);
            //res.write('<img src="/public/'+file+'"></img>');
            console.log(file);
        });
    
    // for(file in files){
    //     let fileLocation = path.join(filepath, file);
    //     //var stat = fs.statSync(fileLocation);
    //     //if(stat && stat.isDirectory()){

    //     //}
    //     //else if(stat && stat.isFile()){
            
    //     //}
    // }
    return allImages;
}

const port = 3000;
app.listen(port, () => console.log(`Listening on Port ${port}...`));
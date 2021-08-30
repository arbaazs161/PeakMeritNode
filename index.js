const express = require("express");
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var session = require('express-session');


const course = require('./routes/course');
const test = require('./routes/test');
const content = require('./routes/content');
const user = require('./routes/user');
const home = require('./routes/home');

mongoose.connect('mongodb://localhost/peakmerit')
    .then(() => console.log('Connected to MongoDB..'))
    .catch(err => console.err('Could not connect to MongoDB...', err.message));

const app = express();

app.set('views', './views');
app.set('view engine', 'ejs');
app.use(session(({secret: 'shhh'})));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));    //https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4

app.use('/course', course);
app.use('/test', test);
app.use('/content', content);
app.use('/user', user);
app.use('/home', home);


const port = 3000;
app.listen(port, () => console.log(`Listening on Port ${port}...`));
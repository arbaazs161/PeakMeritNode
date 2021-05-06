const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Course = require('../model/Course');
var bodyParser = require('body-parser');
var fs = require('fs');
const path = require('path');

router.use(bodyParser.urlencoded({extended: false}));

mongoose.connect('mongodb://localhost/peakmerit')
    .then(() => console.log('Connected to MongoDB..'))
    .catch(err => console.err('Could not connect to MongoDB...', err.message));

router.get('/:id?/:tag?/:name?', (req, res) => {
    var id = req.query.id;
    var tag = req.query.tag;
    var name = req.query.name;

    const courses = getAllCourses();

    if(!id && !tag && !name){
        courses.then(data => {
            res.render('course', {title: 'Courses', headData: 'Add Course', message: '', error: '', courses: data});
        });
        
    }
    else{
        res.write('Not Found!');
    }
});

router.post('/', (req, res) =>{
    
    console.log(req.body);
    var name = req.body.name;
    var tagString = req.body.tags;
    var author = '6093c81ef63cbaec6b6e94c0';

    
    
    console.log(name);
    console.log(tagString);
    var tags = tagString.split(" ");
    console.log(tags);

    const result = addCourse(name, tags, author);
    const courses = getAllCourses();
    result.then(data => {
        createDirectory(name);
        courses.then(courseData => {
            
            res.render('course', {title: 'Courses', headData: 'Add Course', message: data.message, error: '', courses: courseData});
        });
    })
    .catch(err => {
        res.render('course', {title: 'Courses', headData: 'Add Course', message: '', error: err.message, courses: courses});
    });
    
});

async function addCourse(name, tags, author){
    const course = new Course({
        name: name,
        tags: tags,
        author: author
    });

    const result = await course.save();
    console.log(result.message);
    return result;
}

async function getAllCourses(){
    const courses = await Course.find().select();
    return courses;
}

function createDirectory(name){
    fs.mkdir(path.join(__dirname, '../public/Arbaaz/'+name), (err) => {
        if (err) {
            return console.error(err);
        }
        console.log('Directory created successfully!');
    });
}

module.exports = router;
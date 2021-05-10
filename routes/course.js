const express = require('express');
const router = express.Router();

const Course = require('../model/Course');
var bodyParser = require('body-parser');
var fs = require('fs');
const path = require('path');
const Author = require('../model/Author');

router.use(bodyParser.urlencoded({extended: false}));

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
    var author = '60954c6e0b3ccd27744de78b';

    console.log(name);
    console.log(tagString);
    var tags = tagString.split(" ");
    console.log(tags);

    const result = addCourse(name, tags, author);
    result.then(data => {
        createDirectory(name);
        res.redirect('back');
    })
    .catch(err => {
       
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

async function addAuthor(){
    const author = new Author({
        name: 'Arbaaz Shaikh',
        email: 'arbaaz@email.com'
    });

    const result = await author.save();
    console.log(result);
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
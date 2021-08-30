const express = require('express');
const router = express.Router();

const Course = require('../model/Course');
var bodyParser = require('body-parser');
var fs = require('fs');
const path = require('path');
const Author = require('../model/Author');
const User = require('../model/User');

router.use(bodyParser.urlencoded({extended: false}));

router.get('/admin', (req, res) => {
    var id = req.query.id;
    var tag = req.query.tag;
    var name = req.query.name;

    sess = req.session;

    var authorId = sess.authorId;
    //console.log(authorId);

    if(authorId == null){
        res.render('login', {msg: ''});
    }
    else{    
        const courses = getAllCourses(authorId);

        if(!id && !tag && !name){
            courses.then(data => {
                res.render('course', {title: 'Courses', headData: 'Add Course', message: '', error: '', courses: data});
            });
            
        }
        else{
            res.write('Not Found!');
        }
    }
});

router.post('/admin', (req, res) =>{

    sess = req.session;

    var authorId = sess.authorId;
    
    console.log(req.body);
    var name = req.body.name;
    var tagString = req.body.tags;
    var description = req.body.desc;
    var charge = req.body.charge;
    var author = '60954c6e0b3ccd27744de78b';

    console.log(name);
    console.log(tagString);
    var tags = tagString.split(" ");
    console.log(tags);

    const result = addCourse(name, tags, authorId, description, charge);
    result.then(data => {
        createDirectory(name);
        res.redirect('back');
    })
    .catch(err => {
       
    });
    
});

router.get('/byName/:name?', (req, res) => {
    var name = req.query.name;
    //getCourseByTag(name);
    var result = getCourseByName(name);
    result.then(data => {
        res.send(data);
    });
    //res.send('Hello Named Courses');
});

router.get('/byId/:id?', (req, res) => {
    var id = req.query.id;

    var result = getCourse(id);

    result.then(data => {
        res.send(data);
    });
});

router.get('/byUser/:user?', (req, res) => {
    var id = req.query.user;
    
    var result = getCourseforUser(id);
    result.then(data => {
        console.log(data);
        res.send(data);
    });
});

router.get('/getCourseId/:user?', (req, res) => {
    var id = req.query.user;
    const Ids = getCourseIds(id);

    Ids.then(data => {
        res.send(data);
    });
});

router.get('/getAll', (req, res) => {
    const course = getAllCoursesUser();
    //console.log(course);
    var courses = [];
    course.then( data => {
        console.log(data);
        res.send(data);
    });
    
});

router.post('/enroll', (req, res) => {
    var user = req.body.user;
    var course = req.body.course;

    var result = enroll(user, course);

    result.then(data => {
        res.send("Done");
    });
});


async function addCourse(name, tags, author, description, charge){
    const course = new Course({
        name: name,
        tags: tags,
        author: author,
        description: description,
        charge: charge
    });

    const result = await course.save();
    console.log(result);
    return result;
}

async function getCourseIds(user){
    var courses = await User.find({_id: user}).select('courses -_id');
    console.log(courses);
    return courses;
}

async function addAuthor(){
    const author = new Author({
        name: 'Arbaaz Shaikh',
        email: 'arbaaz@email.com'
    });

    const result = await author.save();
    console.log(result);
}


async function getAllCourses(authorId){
    const courses = await Course.find({author: authorId}).populate('author', 'name -_id').select('name tags author charge');
    return courses;
}

async function getAllCoursesUser(){
    const courses = await Course.find().populate('author', 'name -_id').select('name tags author charge');
    return courses;
}

async function getCourseforUser(userId){
    var courses = [];

    var courseIds = await User.find({ _id: userId}).select('courses -_id');

    for(i in courseIds[0].courses){
        var course = await Course.findById(courseIds[0].courses[i]).populate('author', 'name -_id').select('name tags author');
        courses.push(course);
        //console.log(course);
    }
    //console.log('Array', courses);
    return courses;
}

async function getCourseByName(name){
    var courses = await Course.find({ name: new RegExp(name, 'i') }).populate('author', 'name -_id').select('name tags author');
    console.log(courses);
}

//getCourseByName('python');

//getCourseforUser('609ada04d2dd191adcce3514');

async function getCourse(id){
    var course = await Course.findById(id).populate('author', 'name -_id').select('name tags author description');
    console.log(course);
    return course;
}


function createDirectory(name){
    fs.mkdir(path.join(__dirname, '../public/Arbaaz/'+name), (err) => {
        if (err) {
            return console.error(err);
        }
        console.log('Directory created successfully!');
    });
}

async function enroll(userId, courseId){
    var tags = await Course.findOne({ _id: courseId}).select('tags -_id');

    console.log('Tags : ' + tags.tags);

    var result = await User.findByIdAndUpdate(userId, {$addToSet : {courses: courseId, tags : tags.tags}});

    return result;
}

//enroll('609ada04d2dd191adcce3514', '6093e2aadf11983374538dd8');

module.exports = router;
const express = require('express');
const router = express.Router();

var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({extended: false}));


var fs = require('fs');
const Course = require('../model/Course');
const Test = require('../model/Test');

router.get('/create', (req, res) => {
    sess = req.session;

    var authorId = sess.authorId;



    if(authorId != null){
        const courses = getCourses(authorId);
        const tests = getTests(authorId);
        courses.then(data => {
            tests.then(tests => {
                res.render('test', {courses : data, tests: tests});
            });
            
        });
        
    }
    else{
        res.redirect('../home/login');
    }
});

router.post('/create', (req, res) =>{
    sess = req.session;

    var authorId = sess.authorId;
    var name = req.body.name;
    var startDate = req.body.startdate;
    var endDate = req.body.enddate;
    var course = req.body.course;

    const result = addTest(name, startDate, endDate, course, authorId);

    result.then(data => {
        res.redirect('back');
    });

});

async function addTest(name, startDate, endDate, course, author){
    const test = new Test({
        name: name,
        startDate: startDate,
        endDate: endDate,
        course: course,
        author: author
    });

    const result = await test.save();
    console.log(result);
    return result;
}

async function getCourses(authorId){
    const courses = await Course.find({author: authorId}).select('name');
    console.log(courses);
    return courses;
}

async function getTests(authorId){
    const tests = await Test.find({author: authorId}).populate('course', 'name -_id').select('name startDate course');
    console.log(tests);
    return tests;
}

module.exports = router;
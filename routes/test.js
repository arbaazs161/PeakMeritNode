const express = require('express');
const router = express.Router();

var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({extended: false}));


var fs = require('fs');
const Course = require('../model/Course');
const Test = require('../model/Test');
const Question = require('../model/Question');

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
    var startDate = req.body.starttime;
    var endDate = req.body.endtime;
    var course = req.body.course;

    console.log(startDate + " " + endDate);

    const result = addTest(name, startDate, endDate, course, authorId);

    result.then(data => {
        res.redirect('back');
    });

});

router.get('/question/:id?', (req, res) => {
    sess = req.session;
    var tid = req.query.id;

    sess.testId = tid;

    if(sess.testId != null){
        const questions = getQuestions(sess.testId);

        questions.then(data => {
            res.render('questions', {questions: data});        
        });
    }
    else{
        res.redirect('../home/login');
    }
    
});

router.post('/question', (req, res) => {
    sess = req.session;

    var question = req.body.question;
    var opt1 = req.body.opt1;
    var opt2 = req.body.opt2;
    var opt3 = req.body.opt3;
    var opt4 = req.body.opt4;
    var correct = req.body.correct;
    var score = req.body.point;

    var options = [opt1, opt2, opt3, opt4];

    const result = addQuestion(question, options, parseInt(correct), parseInt(score), sess.testId);

    result.then(data => {
        res.redirect('back');
    });

    //console.log(req.body);
    //console.log(options);

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

async function addQuestion(question, options, correct, point, test){
    const quest = new Question({
        question: question,
        options: options,
        correct: correct,
        point: point,
        test: test
    });

    const result = await quest.save();
    console.log(result);
    return result;
}

async function getQuestions(testId){
    const questions = await Question.find({ test: testId}).select('question options correct point');
    return questions;
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
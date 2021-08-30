const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
var formidable = require('formidable');
const Course = require('../model/Course');
var bodyParser = require('body-parser');
var fs = require('fs');
const path = require('path');
const Content = require('../model/Content');

router.use(bodyParser.urlencoded({extended: false}));
var sess;

router.get('/admin/:id?', (req, res) => {
    sess = req.session;
    var id = req.query.id;
    //console.log(id);
    sess.courseId = id;
    const contents = 1;
    //console.log('Session Value: ' + sess.courseId);
    const result = getContentsById(sess.courseId);
    result.then(contents => {
        res.render('content', { contents: contents });
    });

});

router.post('/admin', (req, res) =>{

    var courseName;
    const course = getCourseNameById(sess.courseId);
    course.then(data => {
        courseName = data.name;
    });

    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        var oldpath = files.contentFile.path;
        console.log('Old Path : ' + oldpath);
        var newpath = './public/Arbaaz/' + courseName + '/' + files.contentFile.name;
        console.log('New Path : '+ newpath);
        var priority = fields.file_priority;
        var description = fields.desc;
        var name = files.contentFile.name.split('.').slice(0, -1).join('.');
        //console.log(priority);
        fs.readFile(oldpath, function (err, data) {
            if (err) throw err;
            console.log('File read!');

            //Write the file
            fs.writeFile(newpath, data, function (err) {
                if (err) throw err;

                const result = addContent(newpath, name, sess.courseId, priority, description);

                result.then(data => {
                    res.redirect('back');
                });
                
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

router.get('/getVideo/:url?', (req, res) => {
    var url = req.query.url;
    console.log(url);
    res.sendFile(path.join(__dirname, '../', url));
});

router.get('/getByCourse/:id?', (req, res) => {
    var id = req.query.id;
    const result = getContentByCourse(id);

    result.then(data => {
        res.send(data);
    }).catch(err => {
        res.send(err.message);
    });
});

async function getContentsById(id){
    const result = await Content.find({ course: id }).sort('priority');

    //console.log(result);
    return result;
}

async function addContent(path, name, course, priority, description){
    const content = new Content({
        contentName: name,
        contentPath: path,
        course: course,
        priority: priority,
        description: description
    });

    const result = await content.save();
    console.log(result);
}

async function getCourseNameById(id){
    const courses = await Course.findById(id);
    //console.log(courses);
    return courses;
}

async function getContentByCourse(id){
    const result = await Content.find({ course: id }).sort('priority').select('contentName contentPath description');

    //console.log(result);
    return result;
}

module.exports = router;
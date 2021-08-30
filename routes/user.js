const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Course = require('../model/Course');
var bodyParser = require('body-parser');
var fs = require('fs');
const User = require('../model/User');
const { route } = require('./course');

router.use(bodyParser.urlencoded({extended: false}));
var sess;

router.get('/', (req, res) => {

});

router.post('/login', (req, res) => {
    var email = req.body.email;
    var password = req.body.password;

    var result = loginUser(email, password);

    result.then(data => {
        res.send(data);
    })
    .catch(error => {
        res.send(error);
    });
});

router.post('/register', (req, res) => {
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;

    var result = createUser(name, email, password);

    result.then(data => {
        res.send(data);
    })
    .catch(error => {
        res.send(error);
    });

});

router.get('/courselist/:user?', (req, res) => {
    var id = req.query.user;

    const result = getCourseList(id);

    result.then(data => {
        res.send(data);
    });
});

router.get('/getuser/:id?', (req, res) => {

    var id = req.query.id;

    var result = getUser(id);

    result.then(data => {
        res.send(data);
    });

});

async function getUser(id){
    const user = await User.findById(id).select('name email tags');

    console.log(user);
    return user;
}

//getUser('609ada04d2dd191adcce3514');

async function createUser(name, email, password){

    const checkUser = await User.findOne({ email: email});
    //checkUser = true;
    if(checkUser == null){
        const user = new User({
            name: name,
            email: email,
            password: password
        });

        const result = await user.save();
        console.log(result);
        return result._id;
    }
    else{
        return "Fail";
    }
}


async function loginUser(email, password){
    const checkUser = await User.findOne({ email: email, password: password });

    if(checkUser == null){
        return "Fail";
    }
    else{
        return checkUser._id;
    }
}

async function getCourseList(id){
    var result = await User.findById(id).select('courses -_id');
    console.log('Result' + result.courses);

    return result.courses;
}

module.exports = router;
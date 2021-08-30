const express = require('express');
const router = express.Router();

const Course = require('../model/Course');
var bodyParser = require('body-parser');
var fs = require('fs');
const path = require('path');
const Author = require('../model/Author');
const User = require('../model/User');
const { request } = require('http');

router.use(bodyParser.urlencoded({extended: false}));

router.get('/login', (req, res) => {
    res.render('login', {msg: ''});
});

router.post('/login', (req, res) => {
    sess = req.session;

    var username = req.body.email;
    var password = req.body.password;

    var result = login(username, password);

    result.then(data => {
        if(data == 'Fail'){
            res.render('login', {msg: 'Incorrect Email/Password Combo'});
        }
        else{
            sess.authorId = data._id;
            res.redirect('../course/admin');
        }
    });

});

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', (req, res) => {

    sess = req.session;
    
    var fname = req.body.firstname;
    var lname = req.body.lastname;
    var name = fname + " " + lname;
    var email = req.body.email;
    var pass = req.body.password;
    var jtitle = req.body.jobtitle;
    
    var result = register(name, email, pass, jtitle);

    result.then(data => {
        sess.authorId = data._id;
        res.redirect('../course/admin');
    }).catch(err => {

    });
});

async function login(user, pass){
    const author = await Author.findOne({ email: user, password: pass});
    console.log(author);

    if(author == null){
        //console.log("Fail");
        return "Fail";
    }
    else{
        console.log(author);
        return author;
    }
}

async function register(name, email, pass, jtitle){
    const author = new Author({
        name: name,
        email: email,
        password: pass,
        jobtitle: jtitle
    });

    const result = await author.save();
    console.log(result);
    return result;
}

module.exports = router
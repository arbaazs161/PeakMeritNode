const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Course = require('../model/Course');
var bodyParser = require('body-parser');
var fs = require('fs');
const User = require('../model/User');

router.use(bodyParser.urlencoded({extended: false}));
var sess;

router.get('/', (req, res) => {

});

router.post('/', (req, res) => {

});

router.post('/register', (req, res) => {
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;

});

async function createUser(name, email, password){
    const user = await User.find({ email: email});
}
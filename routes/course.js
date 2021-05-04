const express = require('express');
const router = express.Router();

router.get('/:id?/:tag?/:name?', (req, res) => {
    var id = req.query.id;
    var tag = req.query.tag;
    var name = req.query.name;

    console.log(`Id : ${id}, tag : ${tag}, Name: ${name}`);
    
    //res.send(course);
});

router.post('/', (req, res) =>{
    console.log('Posted a Course');
});

module.exports = router;
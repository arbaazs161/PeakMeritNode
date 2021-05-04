const express = require('express');
const router = express.Router();

router.get('/:id?', (req, res) => {
    var id = req.params.id;
    if(id) console.log(`Id : ${id}`);

    console.log('Getting all Tests!');
    
});

router.post('/', (req, res) =>{
    console.log('Posted a Test');
});

module.exports = router;
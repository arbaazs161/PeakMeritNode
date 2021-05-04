const express = require("express");

const course = require('./routes/course');
const test = require('./routes/test');

const app = express();

app.use('/course', course);
app.use('/test', test);

const port = 3000;
app.listen(port, () => console.log(`Listening on Port ${port}...`));
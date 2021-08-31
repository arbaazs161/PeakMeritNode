const mongoose = require('mongoose');

const testSchema = {
    name: {
        type: String,
        required: true,
    },
    startDate: {
        type: String,
        required: true
    },
    endDate: {
        type: String,
        required: true
    },
    course: {
        type: mongoose.Schema.Types.ObjectId ,
        ref: 'Course'
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author'
    }
}

const Test = mongoose.model('Test', testSchema);

module.exports = Test;
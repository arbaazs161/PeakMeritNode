const mongoose = require("mongoose")

const courseSchema = {
    name: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 50
    },
    tags: {
        type: [ String ],
        required: true
    },
    publishDate: {
        type: Date,
        default: Date.now
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author',
        required: true
    }
}

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
const { Mongoose } = require("mongoose")

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
    }
}

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
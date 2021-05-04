const { Mongoose } = require("mongoose");
const Course = require("./Course");

const userSchema = {
    name: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 50
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    },
    courses: {
        type: [ mongoose.Schema.Types.ObjectId ],
        ref: 'Course'
    },
    tags: {
        type: [ String ],
        required: true
    },
}

const User = mongoose.model('User', userSchema);

module.exports = User;
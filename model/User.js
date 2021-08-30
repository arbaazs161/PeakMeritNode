const mongoose = require("mongoose");
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
    school: {
        type: String,
    },
    field: {
        type: [ String ],
        required: true
    },
    profileimage: {
        data: Buffer,
        contentType: String,
    }
}

const User = mongoose.model('User', userSchema);

module.exports = User;
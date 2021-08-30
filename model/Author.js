const mongoose = require("mongoose");

const adminSchema = {
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
        required: true
    },
    profileimage: {
        data: Buffer,
        contentType: String,
    },
    jobtitle: {
        type: String,
        required: true
    }
}

const Author = mongoose.model('Author', adminSchema);

module.exports = Author;
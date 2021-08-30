const mongoose = require("mongoose");

const contentSchema = {
    contentName: {
        type: String,
        required: true
    },
    contentPath: {
        type: String,
        required: true
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    },
    priority: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    }
};

const Content = mongoose.model('Content', contentSchema);

module.exports = Content;
const questionSchema = {
    serial: {
        type: String,
        required: true
    },
    section: {
        type: String,
        required: true
    },
    question: {
        type: String,
        required: true
    },
    options: {
        type: Map,
        of: Number
    }
}

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
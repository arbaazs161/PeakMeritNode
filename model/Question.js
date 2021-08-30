const questionSchema = {
    
    section: {
        type: String,
        required: true
    },
    question: {
        type: String,
        required: true
    },
    options: {
        type: [ String ],
        required: true
    },
    correct:{
        type: Number,
        required: true
    },
    point:{
        type: Number,
        required: true
    },
    test:{
        type: [ mongoose.Schema.Types.ObjectId ],
        ref: 'Test'
    }
}

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
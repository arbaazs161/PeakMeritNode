const testSchema = {
    name: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    course: {
        type: [ mongoose.Schema.Types.ObjectId ],
        ref: 'Course'
    },
    author:{
        type: [ mongoose.Schema.Types.ObjectId ],
        ref: 'Author'
    }
}

const Test = mongoose.model('Test', testSchema);

module.exports = Test;
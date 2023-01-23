const { Schema, model } = require('mongoose')


const questionSchema = Schema({
    category: {
        type: String
    },
    image:
    {
        data: Buffer,
        contentType: String
    },
    question: {
        type: String,
        required: true
    },
    answers: {
        type: [{ answer: { type: String, required: true }, isCorrect: { type: Boolean, required: true }, _id: false }],
        required: true
    },
    creator: {
        type: String,
        required: true
    }
})

const Question = model('question', questionSchema);

module.exports = Question 
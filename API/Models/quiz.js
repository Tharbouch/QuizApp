const { Schema, model } = require('mongoose')

const quizSchema = Schema({
    name: {
        type: String,
        required: true
    },
    image:
    {
        data: Buffer,
        contentType: String
    },
    description: {
        type: String,
        required: true
    },
    questions: {
        type: [{
            id: {
                type: String,
                required: true
            },
            question: {
                type: String,
                required: true
            }
        }]
    },
    duration: {
        type: Number,
        required: true
    },
    level: {
        type: String,
        required: true
    },
    creator: {
        type: String,
        required: true
    }
});

const Quiz = model("quiz", quizSchema);
module.exports = Quiz;
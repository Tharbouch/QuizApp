const { Schema, model } = require('mongoose')

const quizSchema = Schema({
    name: {
        type: String,
        required: true
    },
    image:
    {
        data: Buffer,
        contentType: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    studentsList: {
        type: [{
            name: {
                type: String,
                required: true
            },
            attempts: {
                type: Number,
                required: true
            }
        }]
    },
    createdBy: {
        type: String,
        required: true
    }
});

const Quiz = model("quiz", quizSchema);
module.exports = Quiz;
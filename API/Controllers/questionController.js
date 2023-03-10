const Question = require('../Models/questions')
const fs = require('fs')
const path = require('path')



const getQuestions = (req, res, next) => {

    Question.find({ creator: req.query.creator })
        .exec()
        .then((response) => {

            let customResponse = response.reduce((acc, curr) => {

                if (!acc[curr.category]) {
                    acc[curr.category] = [];
                }
                acc[curr.category].push(curr);
                return acc;
            }, {})

            res.status(200).json(customResponse)
        })
        .catch((err) => {
            console.log(err)
            res.status(500)
            next(err)
        })
}


const addQuestion = (req, res, next) => {

    if (req.file) {

        let img = null
        let imagepath = null

        try {
            imagepath = path.join(`${process.cwd()}/` + req.file.path)
            img = {
                img: {
                    data: fs.readFileSync(imagepath),
                    contentType: req.file.mimetype
                }
            }

        } catch (error) {
            console.log(error)
            res.status(500)
            next(error)
        }


        Question.create({
            category: req.body.category,
            image: img.img,
            question: req.body.question,
            answers: JSON.parse(req.body.answers),
            creator: req.body.createdBy
        }).then((response) => {
            res.status(201)
                .json({ message: "success" })
        }).catch((err) => {
            res.status(500)
            next(err)
        })

    }

    else {
        Question.create({
            category: req.body.category,
            question: req.body.question,
            answers: JSON.parse(req.body.answers),
            creator: req.body.createdBy
        }).then((response) => {
            res.status(201)
                .json({ message: "success" })
        }).catch((err) => {
            res.status(500)
            next(err)
        })
    }
}

module.exports = { getQuestions, addQuestion }
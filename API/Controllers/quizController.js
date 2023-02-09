const Quiz = require('../Models/quiz')
const fs = require('fs')
const path = require('path')

const getQuiz = (req, res, next) => {
    Quiz.find()
        .exec()
        .then((response) => {
            res.status(200)
                .json(response)
        }).catch((err) => {
            res.status(500)
            next(err)
        })
}

const addQuiz = (req, res, next) => {
    console.log('text')

    let img = null

    try {
        const imagepath = path.join(`${process.cwd()}/` + req.file.path)
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

    Quiz.create({
        name: req.body.name,
        image: img.img,
        description: req.body.description,
        questions: req.body.questions,
        duration: req.body.duration,
        level: req.body.level,
        creator: req.body.creator
    }).then((response) => {
        res.status(201)
            .json({ message: "success" })
    }).catch((err) => {
        console.log(err)
        res.status(500)
        next(err)
    })

}

module.exports = { getQuiz, addQuiz }
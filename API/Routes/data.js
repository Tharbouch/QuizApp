const router = require('express').Router()

const upload = require('../helpers/uploadPhoto')
const controller = require('../Controllers/quizController')

router.get('/quiz', controller.getQuiz)
router.post('/quiz', upload.single("quizimage"), controller.addQuiz)

module.exports = router
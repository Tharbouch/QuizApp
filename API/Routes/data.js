const router = require('express').Router()

const upload = require('../helpers/uploadPhoto')
const quizController = require('../Controllers/quizController')
const questionController = require('../Controllers/questionController')

router.get('/quiz', quizController.getQuiz)
router.post('/quiz', upload.single("quizimage"), quizController.addQuiz)

router.get('/question', questionController.getQuestions)
router.post('/question', upload.single("questionimage"), questionController.addQuestion)

module.exports = router

const route = require('express').Router()
const controller = require('../Controllers/userController')

route.post('/login', controller.logUser)
route.post('/register', controller.registerUser)
route.put('/edit/:id', controller.editUser)
route.delete('/delete/:id', controller.deleteUser)

module.exports = route;
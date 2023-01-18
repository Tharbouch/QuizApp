const express = require('express')
const http = require('http')
const dovenv = require('dotenv').config()
const { errHandler } = require('./Middlewares/errHandler')
const cors = require('cors')
const userRoutes = require('../API/Routes/user')
const connectDb = require('./helpers/connectDb')
connectDb()

const app = express()
const server = http.createServer(app)

// Middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//Routes

app.use('/api/user', userRoutes)

// err middleware

app.use(errHandler)

//Server lunch

server.listen(process.env.PORT || 4000);
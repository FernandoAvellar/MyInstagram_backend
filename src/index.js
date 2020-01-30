const express = require('express')
const mongoose = require('mongoose')

const app = express()

mongoose.connect('mongodb+srv://fernando:fernando@cluster0-pweit.mongodb.net/week7?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

app.use(require('./routes'))

app.listen(8080)
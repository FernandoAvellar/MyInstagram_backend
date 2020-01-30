const express = require('express')
const multer  = require('multer')
const PostController = require('./controllers/PostController')

const routes = new express.Router()
var upload = multer()

routes.post('/posts', upload.single('image'), PostController.store)

module.exports = routes
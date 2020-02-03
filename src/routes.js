const express = require('express')
const multer  = require('multer')
const uploadConfig = require('./config/upload')
const PostController = require('./controllers/PostController')
const LikeController = require('./controllers/LikeController')

const routes = new express.Router()
var upload = multer(uploadConfig)

routes.get('/posts', PostController.index)
routes.delete('/posts/:id', PostController.destroy)
routes.post('/posts', upload.single('image'), PostController.store)
routes.post('/posts/:id/like', LikeController.store)

module.exports = routes
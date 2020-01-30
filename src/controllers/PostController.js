const Post = require('../models/Post')

module.exports = {
    async index(req, res) {

    },

    async store(req, res) {
        const { author, place, description, hashtags } = req.body
        const fileName = req.file.originalname
        console.log(fileName)
        console.log(author, place, description, hashtags)
        return res.json({OK: true})
    }
}
const Post = require('../models/Post')

module.exports = {
    async index(req, res) {
        const posts = await Post.find().sort('-createdAt') //sinal de '-' siginifica ordenar por datas mais recentes
        return res.json(posts)
    },

    async store(req, res) {
        const { author, place, description, hashtags } = req.body
        const { filename: image } = req.file

        const post = await Post.create({
            author,
            place,
            description,
            hashtags,
            image,
        })

        return res.json(post)
    }
}
const Post = require('../models/Post')

module.exports = {

    async store(req, res) {
        const post = await Post.findById(req.params.id)
        post.likes +=1
        await post.save()
        //Comunica que um novo like foi postado em RealTime via WebSockets
        req.io.emit('like', post) 
        return res.json(post)
    }
}
const Post = require('../models/Post')
const sharp = require('sharp')
const path = require('path')
const fs = require('fs')

module.exports = {
    async index(req, res) {
        const posts = await Post.find().sort('-createdAt') //sinal de '-' siginifica ordenar por datas mais recentes
        return res.json(posts)
    },

    async store(req, res) {
        //Recuperando informações do Body em formato Multipart
        const { author, place, description, hashtags } = req.body
        const { filename: image } = req.file
        const [name] = image.split('.');
        const fileName = (`${name}.jpg`)

        /* Verifica se a pasta resized já está criada e a cria caso não. */
        const resizedFolderPath = path.resolve(__dirname, '..', '..', 'uploads', 'resized')
        if (!fs.existsSync(resizedFolderPath)){
            fs.mkdirSync(resizedFolderPath);
        }

        /* Redimensionando a imagem recebida para 500 pixels com qualidde 70% 
        e movendo para a pasta resized e depois apagando a imagem original*/
        await sharp(req.file.path)
        .resize(500)
        .jpeg({quality: 70})
        .toFile(
            path.resolve(req.file.destination, 'resized', fileName)
        )
        
        fs.unlinkSync(req.file.path)

        const post = await Post.create({
            author,
            place,
            description,
            hashtags,
            image: fileName,
        })

        //Comunica que um novo post foi criado em RealTime a todos usuários via WebSockets
        req.io.emit('post', post) 

        return res.json(post)
    },

    async destroy(req,res) {
        const deletedPost = await Post.findById(req.params.id)
        if(deletedPost) {
            await Post.findByIdAndDelete(req.params.id)
            req.io.emit('delete', deletedPost)
        }
        return res.json()
    }  
}
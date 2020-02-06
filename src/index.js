const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const cors = require('cors')

const app = express()

/* Desacoplando o http e o webSocket do express para podermos responder
ambas requisições e termos uma aplicação também responsiva em Real Time */
const server = require('http').Server(app)
const io = require('socket.io')(server)

mongoose.connect('mongodb+srv://fernando:fernando@cluster0-pweit.mongodb.net/week7?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

/* Criando nosso próprio midleware para dar acesso a todas
linhas após essa definição ao req.io */
app.use((req,res, next) => {
    req.io = io
    next() //Garante que todo código que vem depois continue sendo executado.
})

//Liberando o acesso ao backend para todas as origens de requisições
app.use(cors())

//Sempre que tentarmos acessar o GET /files seremos redirecionados para a nossa pasta de fotos comprimidas
app.use('/files', express.static(path.resolve(__dirname, '..','uploads','resized')))

//Lembrando que agora as nossas rotas também terão acesso ao req.io (WebSockets) e HTTP
app.use(require('./routes'))

server.listen(8080)
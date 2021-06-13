const express = require('express')
const bodyParser = require('body-parser')
const { request, response } = require('express')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

const routes = require('./src/routes/usuarioRoutes.js')
routes(app)

app.route('/')
    .get((req, res) => {
        res.send('Api teste funcionando')
    })

const port = process.env.PORT || 3000

app.listen(port)

console.log('Servidor Funcionando, na porta:', port)



import dotenv from 'dotenv'
dotenv.config()


import { useRoutes } from './routes'

const express = require('express');

const bodyParser = require('body-parser');

const PORT = process.env.PORT || 8000

const app = express()
app.use(function (req, res, next) {

    express.json()

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Pass to next layer of middleware
    next();
    bodyParser.json()
})


useRoutes(app)


app.listen(PORT, () => console.log('Servidor iniciado na porta ' + PORT))

import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import { useRoutes } from './routes'


const bodyParser = require('body-parser');

const PORT = process.env.PORT || 8000

const app = express()
app.use(bodyParser.json())
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Pass to next layer of middleware
    next();
    
})


useRoutes(app)


app.listen(PORT, () => console.log('Servidor iniciado na porta ' + PORT))
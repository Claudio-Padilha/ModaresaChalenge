
import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import { useRoutes } from './routes'

const bodyParser = require('body-parser');

const PORT = process.env.PORT || 8017

const app = express()
app.use(bodyParser.json())
useRoutes(app)


app.listen(PORT, () => console.log('Servidor iniciado na porta ' + PORT))
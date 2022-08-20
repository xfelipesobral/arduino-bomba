import express, { Request, Response, NextFunction } from 'express'
import bodyParser from 'body-parser'

import { createServer } from 'http'
import { Server } from 'socket.io'

import routes from './src/routes'

const porta = 3300

const app = express()

app.use(bodyParser.json({ limit: '300mb' }))

const httpServer = createServer(app)
const io = new Server(httpServer, {
    cors: {
        origin: '*'
    }
})

app.use((request: Request, response: Response, next: NextFunction) => {
    request.socketIo = io
    next()
}, routes)

httpServer.listen(porta, () => {
    console.log('Servidor iniciado...')
})
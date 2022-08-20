import { Router, Request, Response } from 'express'

import socket from './socket.routes'

const router = Router()

router.get('/', (request: Request, response: Response) => {
    response.json({
        status: 'ativo'
    })
})

router.use('/socket', socket)

export default router
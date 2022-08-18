import { Router, Request, Response } from 'express'

const router = Router()

router.get('/', (request: Request, response: Response) => {
    response.json({
        status: 'ativo'
    })
})

export default router
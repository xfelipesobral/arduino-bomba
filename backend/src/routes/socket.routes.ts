import { Router } from 'express'

const router = Router()

import comunica from '../functions/socket/comunica'

router.route('/comunica')
    .post(comunica)

export default router
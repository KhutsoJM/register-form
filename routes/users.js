import express from 'express'

const router = express.Router()

import {
    getForm,
    submitForm
} from '../controllers/users.js'

router.get('/', getForm)
router.post('/', submitForm)



export default router
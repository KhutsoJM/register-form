import express from 'express'

const router = express.Router()

import {
    getForm,
    submitForm,
    showUsers,
} from '../controllers/users.js'

router.get('/', getForm)
router.post('/', submitForm)
router.get('/admin', showUsers)



export default router
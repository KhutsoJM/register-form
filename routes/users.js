import express from 'express'

const router = express.Router()

import {
    getForm,
    submitForm,
    showUsers,
    deleteUser
} from '../controllers/users.js'

router.get('/', getForm)
router.post('/', submitForm)
router.get('/admin', showUsers)
router.delete('/admin/:id', deleteUser)


export default router
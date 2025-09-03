import express from 'express'

const router = express.Router()

import {
    getForm,
    submitForm,
    showUsers,
    getArchivedUsers,
    deleteUser,
    getLearners,
} from '../controllers/users.js';

router.get('/', getForm);
router.post('/', submitForm);
router.get('/admin', showUsers);
router.delete('/admin/:id', deleteUser);
router.get('/admin/archived', getArchivedUsers);
router.get('/admin/learners', getLearners);

export default router;
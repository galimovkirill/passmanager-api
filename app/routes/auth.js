const express = require('express')
const router = express.Router()
const controller = require('../controllers/auth')
const { check } = require('express-validator')
const authMiddleware = require('../middleware/auth')
const roleMiddleware = require('../middleware/role')


router.post('/create-user', [
    check('first_name', 'First name of user can not be empty.').notEmpty(),
    check('last_name', 'Last name of user can not be empty.').notEmpty(),
    check('password', 'Password must be longer than 5 symbols').isLength({ min: 5 })
], controller.createUser)
router.post('/login', controller.login)
router.get('/users', roleMiddleware(['ADMIN']), controller.getUsers)

module.exports = router

const express = require('express')
const router = express.Router()
const controller = require('../controller/user')
const {isAdmin,authenticateToken,validateUser} = require('../middlewares/auth')

router.post('/register',validateUser,controller.regiterUser)
router.post('/login',validateUser,controller.loginUser)
router.get('/users', authenticateToken, isAdmin,controller.getAllUser)
router.get('/users/:id', authenticateToken, isAdmin, controller.getUserById)

module.exports = router;
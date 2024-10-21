const express = require('express');
const router = express.Router();
const controller = require('../controller/task')
const {isAdmin,authenticateToken,validateTask} = require('../middlewares/auth')

router.post('/tasks', authenticateToken,validateTask,controller.createTask)
router.get('/tasks', authenticateToken, controller.getAllTask)
router.get('/tasks/:id', authenticateToken, controller.getSingleTask)
router.put('/tasks/:id', authenticateToken,validateTask,controller.updateTask)
router.delete('/tasks/:id', authenticateToken, controller.deleteTask)



module.exports = router

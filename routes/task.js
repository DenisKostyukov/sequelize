const { Router } = require('express');
const TaskController = require('../controller/task.controller.js');
const {checkUser} = require('../middleware/user.middleware.js')

const router = Router();
router.post('/:id',checkUser, TaskController.createTask);
router.get('/:id',checkUser, TaskController.getUserTasks);
router.get('/', TaskController.getAllTasks);
router.patch('/:id',TaskController.updateTask);
router.delete('/:id',TaskController.deleteTask);
module.exports = router;
const { Router } = require('express');
const TaskController = require('../controller/task.controller.js');
const {checkUser} = require('../middleware/user.middleware.js')

const router = Router();
router.post('/:id',checkUser, TaskController.createTask);
router.get('/:id',checkUser, TaskController.getUserTasks);
module.exports = router;
const { Router } = require('express');
const UserController = require('./controller/user.controller.js');
const TaskController = require('./controller/task.controller.js');

const UserMW = require('./middleware/user.middleware');
const router = Router();

router.post('/user', UserController.createUser);
router.get('/users', UserController.getAllUsers);
router.post('/user/:id/task', UserMW.checkUser, TaskController.createTask);
module.exports = router;

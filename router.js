const {Router} = require('express');
const UserController = require('./controller/user.controller.js')
const router = Router();

router.post('/user', UserController.createUser)
router.get('/users', UserController.getAllUsers)
module.exports = router;
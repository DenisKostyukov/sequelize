const { Task } = require('../models');
module.exports.createTask = async (req, res, next) => {
  try {
    const { body, userInstance } = req;
    //const createdTask = await Task.create(...body, userId: userInstance.userId);
    const createdTask = await userInstance.createTask(body);
    console.log(createdTask);
    res.status(201).send({
      data: createdTask,
    });
  } catch (error) {
    res.status(400).send({
      error,
    });
    //next(error);
  }
};

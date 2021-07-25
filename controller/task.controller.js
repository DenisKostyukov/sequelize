const { Task } = require('../models');
module.exports.createTask = async (req, res, next) => {
  try {
    const { body, userInstance } = req;
    const createdTask = await userInstance.createTask(body);
    console.log(createdTask);
    res.status(201).send({
      data: createdTask,
    });
  } catch (error) {
    res.status(400).send({
      error,
    });
  }
};
module.exports.getUserTasks = async (req, res, next) => {
  try {
    const { userInstance } = req;
    const tasks = await userInstance.getTasks();
    res.send(tasks);
  } catch(error){
    next(error)
  }
};
module.exports.getAllTasks = async (req, res, next) => {
  try {
    const tasks = await Task.findAll();
    if (!tasks.length) {
      const err = createError(404, 'Tasks not found');
      return next(err);
    }
    res.status(200).send({
      data: tasks,
    });
  } catch (err) {
    next(err);
  }
};

module.exports.updateTask = async (req, res, next) => {
  try {
    const {
      params: { id },
      body,
    } = req;

    const [rowsCount, updatedTask] = await Task.update(body, {
      where: { id },
      returning: true,
    });
    if (rowsCount !== 1) {
      return next(createError(400, "User can't be updated"));
    }
    res.send({
      data: updatedTask,
    });
  } catch (err) {
    next(err);
  }
};
module.exports.deleteTask = async (req, res, next) => {
  try {
    const {
      params: { id },
    } = req;

    const rowsCount = await Task.destroy({
      where: { id },
    });

    if (rowsCount !== 1) {
      return next(createError(404, 'User not found'));
    }

    res.send({ data: rowsCount });
  } catch (err) {
    next(err);
  }
};
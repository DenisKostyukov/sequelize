const { User } = require('../models');
const createError = require('http-errors');
module.exports.createUser = async (req, res, next) => {
  try {
    const { body } = req;
    const createdUser = await User.create(body);
    console.log(createdUser);
    res.status(201).send({
      data: createdUser,
    });
  } catch (error) {
    res.status(400).send({
      error,
    });
    next(error);
  }
};

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const [count, users] = await User.findAndCountAll({
      attributes: {
        exclude: ['password'],
      },
    });
    if (count === 0) {
      const err = createError(404, 'Users not found');
      return next(err);
    }
    res.status(200).send({
      data: users,
    });
  } catch (error) {
    next(error);
  }
};
module.exports.getUser = async (req, res, next) => {
  try {
    const {
      params: { id },
    } = req;
    const user = await User.findByPk(id, {
      attributes: {
        exclude: ['password'],
      },
    });
    if (!user) {
      const err = createError(404, 'User not found');
      return next(err);
    }
    res.send(user);
  } catch (error) {
    next(error);
  }
};

module.exports.updateUser = async (req, res, next) => {
  try {
    const {
      params: { id },
      body,
    } = req;
    const [rowsCount, updatedUser] = await User.update(body, {
      where: { id: id },
      returning: true,
      limit: 1,
    });
    if (rowsCount !== 1) {
      return next(createError(400, "User can't be updated"));
    }
    updatedUser.password = undefined;

    res.send({ data: updatedUser });
  } catch (err) {
    next(err);
  }
};
module.exports.deleteUser = async (req, res, next) => {
  try {
    const {
      params: { id },
    } = req;
    const rowsCount = await User.destroy({ where: { id }, limit: 1 });
    if (rowsCount !== 1) {
      return next(createError(404, 'User not found'));
    }
    res.send({ data: rowsCount });
  } catch (err) {
    next(err );
  }
};

'use strict';
const { Model } = require('sequelize');
const { isAfter } = require('date-fns');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      Task.belongsTo(models.User,{
        foreignKey: 'userId',
      })
    }
  }
  Task.init(
    {
      userId: {
        field: 'user_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        validate: {
          notNull: true,
        },
      },
      body: {
        type: DataTypes.STRING(512),
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      isDone: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      deadline: {
        type: DataTypes.DATEONLY,
        isDate: true,
        validate: {
          isDate: true,
        },
      },
    },
    {
      sequelize,
      modelName: 'Task',
      tableName: 'tasks',
      underscored: true,
    }
  );
  return Task;
};

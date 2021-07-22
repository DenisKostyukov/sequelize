'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  }
  Task.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userId: {
        field: 'user_id',
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      body: {
        type: DataTypes.STRING(512),
        allowNull: false,
        validate: {
          isEmpty (value) {
            if (value === '') {
              throw new Error('body can`t be empty');
            }
          },
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
        validate:{
          isDate: true
        }
      },
    },
    {
      sequelize,
      modelName: 'Task',
      tableName: 'task',
      underscored: true
    }
  );
  return Task;
};

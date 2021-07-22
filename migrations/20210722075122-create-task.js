'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('tasks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        field: "user_id",
        allowNull: false,
        type: Sequelize.INTEGER
      },
      body: {
        type: Sequelize.STRING(512),
        allowNull: false,
      },
      isDone: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      deadline: {
        type: Sequelize.DATEONLY,
      },
      createdAt: {
        field: "created_at",
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        field: "updated_at",
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('tasks');
  }
};
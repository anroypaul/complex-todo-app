'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Todos', 'dueDate', {
      type: Sequelize.DATEONLY,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Todos', 'dueDate', {
      type: Sequelize.DATE,
      allowNull: true,
    });
  },
};

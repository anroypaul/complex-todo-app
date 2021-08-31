'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Todos', // name of Source model
      'CategoryId', // name of the key we're adding
      {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Categories', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Todos', // name of Source model
      'CategoryId', // key we want to remove
    );
  },
};

'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  /**
   * @model Todo
   */
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     * @param {*} models
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User);
      this.belongsTo(models.Category);
    }
  }
  Todo.init(
    {
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0,
      },
      priority: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
      dueDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
    },
    {
      sequelize,
      timestamps: true,
      modelName: 'Todo',
    },
  );
  return Todo;
};

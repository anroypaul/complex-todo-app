const {Sequelize, DataTypes, Model} = require('sequelize');
const sequelize = new Sequelize('sqlite::memory');

const Category = require('./_Category');

/**
 * @model Todo
 */
class Todo extends Model {}

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
      type: DataTypes.DATE,
      allowNull: true,
    },
    // categoryId: {
    //   type: DataTypes.INTEGER,
    //   references: {
    //     model: Category,
    //     key: 'id',
    //   },
    // },
  },
  {
    sequelize,
    modelName: 'Todo',
  },
);

Todo.Category = Todo.belongsTo(Category);

export default Todo;

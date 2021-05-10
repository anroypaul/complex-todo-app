const {Sequelize, DataTypes, Model} = require('sequelize');
const sequelize = new Sequelize('sqlite::memory');

const User = require('./User');
const Todo = require('./_Todo');

/**
 * @model Category
 */
class Category extends Model {}

Category.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // userId: {
    //   type: DataTypes.INTEGER,
    //   references: {
    //     model: User,
    //     key: 'id',
    //   },
    // },
  },
  {
    sequelize,
    modelName: 'Category',
  },
);

Category.User = Category.belongsTo(User);
Category.Todos = Category.hasMany(Todo);

export default Category;

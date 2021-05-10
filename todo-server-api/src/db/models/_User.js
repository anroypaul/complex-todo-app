const {Sequelize, DataTypes, Model} = require('sequelize');
const sequelize = new Sequelize('sqlite::memory');

/**
 * @model User
 */
class User extends Model {}

User.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'User',
  },
);

module.exports = User;

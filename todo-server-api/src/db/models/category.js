'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  /**
   * @model Category
   */
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     * @param {*} models
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User);
      this.hasMany(models.Todo);
    }
  }
  Category.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: true,
      modelName: 'Category',
    },
  );
  return Category;
};

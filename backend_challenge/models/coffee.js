'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Coffee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Coffee.hasMany(models.Post, { foreignKey: 'coffee' })
    }
  }
  Coffee.init({
    name: DataTypes.STRING,
    year: DataTypes.INTEGER,
    caffine_content: DataTypes.FLOAT,
    caffine_percentage: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Coffee',
  });
  return Coffee;
};

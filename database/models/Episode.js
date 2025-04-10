'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Episode extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Episode.init({
    title: DataTypes.STRING,
    number: DataTypes.INTEGER,
    release_date: DataTypes.DATE,
    rating: DataTypes.DECIMAL,
    season_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Episode',
    underscored: true,
  });
  return Episode;
};
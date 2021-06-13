'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Dicas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Dicas.init({
    dicaDeHoje: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Dicas',
  });
  return Dicas;
};
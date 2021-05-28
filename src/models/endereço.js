'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Endereço extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Endereço.init({
    Complemento: DataTypes.STRING,
    Numero: DataTypes.INTEGER,
    Estado: DataTypes.STRING,
    Cep: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Endereço',
  });
  return Endereço;
};
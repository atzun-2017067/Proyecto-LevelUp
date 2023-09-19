const { DataTypes } = require('sequelize');
const { dbConnection } = require('../database/config');

// Define el modelo 'Carrito'
const Carrito = dbConnection.define('Carrito', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  estado: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

module.exports = Carrito;
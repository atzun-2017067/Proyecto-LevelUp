const { DataTypes } = require('sequelize');
const { dbConnection } = require('../database/config');

const CursoCarrito = dbConnection.define('CursoCarrito', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  cursoId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  carritoId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  estado: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
});
  
module.exports = CursoCarrito;
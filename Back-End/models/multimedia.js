const { DataTypes } = require('sequelize');
const { dbConnection2 } = require('../database/config');

// Define el modelo 'Multimedia'
const Multimedia = dbConnection2.define('Multimedia', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  imagenPortada: {
    type: DataTypes.STRING,
    defaultValue: 'Sin Imagen'
  }
})

console.log('Antes de la sincronización de Multimedia');
Multimedia.sync({ alter: true })
  .then(() => {
    console.log('Modelo de Multimedia sincronizado con la base de datos 2');
  })
  .catch((error) => {
    console.error('Error al sincronizar el modelo de Multimedia:', error);
  });
console.log('Después de la sincronización de Multimedia');

// Exporta el modelo para que pueda ser utilizado en otras partes de la aplicación
module.exports = Multimedia;
const { DataTypes } = require('sequelize');
const { dbConnection2 } = require('../database/config');

// Define el modelo 'Multimedia'
const Multimedia = dbConnection2.define('Multimedia', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  cursoId: { // Asegúrate de que esta columna exista en el modelo Multimedia
    type: DataTypes.INTEGER, // El tipo de dato debe coincidir con el de la columna correspondiente en Curso
    allowNull: false, // Puedes ajustar esto según tus necesidades
  },
  imagenPortada: {
    type: DataTypes.BLOB,
    defaultValue: 'Sin Imagen'
  }
})

// Exporta el modelo para que pueda ser utilizado en otras partes de la aplicación
module.exports = Multimedia;
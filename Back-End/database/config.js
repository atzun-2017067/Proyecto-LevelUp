const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

const session = require('express-session'); // Importa express-session
const SequelizeStore = require('connect-session-sequelize')(session.Store); // Importa SequelizeStore desde connect-session-sequelize

dotenv.config(); // Carga las variables de entorno desde el archivo .env

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_NAME_2 } = process.env;

// Función que crea y devuelve la conexión a la base de datos
const dbConnection = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: 'mysql', // El dialecto de tu base de datos (en este caso, MySQL)
  timezone: 'America/Guatemala'
});

// Conexión a la segunda base de datos
const dbConnection2 = new Sequelize(DB_NAME_2, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: 'mysql',
  timezone: 'America/Guatemala',
});

// Verificar la conexión a la base de datos
dbConnection
  .authenticate()
  .then(() => {
    console.log('Conexión exitosa a la base de datos MySQL');
  })
  .catch((error) => {
    console.error('Error al conectar a la base de datos:', error);
  });

// Verificar la conexión a la base de datos
dbConnection2
  .authenticate()
  .then(() => {
    console.log('Conexión exitosa a la base de datos 2 MySQL');
  })
  .catch((error) => {
    console.error('Error al conectar a la base de datos 2:', error);
  });

// Configuración de connect-session-sequelize
const sessionStore = new SequelizeStore({
  db: dbConnection,
});

module.exports = {
  dbConnection,
  dbConnection2,
  sessionStore
};
const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

const session = require('express-session'); // Importa express-session
const SequelizeStore = require('connect-session-sequelize')(session.Store); // Importa SequelizeStore desde connect-session-sequelize

dotenv.config(); // Carga las variables de entorno desde el archivo .env

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

// Función que crea y devuelve la conexión a la base de datos
const dbConnection = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: 'mysql', // El dialecto de tu base de datos (en este caso, MySQL)
  timezone: 'America/Guatemala'
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

// Configuración de connect-session-sequelize
const sessionStore = new SequelizeStore({
  db: dbConnection,
});

module.exports = {
  dbConnection,
  sessionStore
};
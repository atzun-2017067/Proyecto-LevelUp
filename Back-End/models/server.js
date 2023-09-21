const express = require('express');
const cors = require('cors');

const { dbConnection, sessionStore } = require('../database/config'); // Importa la conexión a la base de datos
const session = require('express-session'); // Importa express-session
const SincronizacionModelos = require('./sincronizacion')

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            curso: '/api/cursos',
            carrito: '/api/carrito',
            cursocarrito: '/api/cursocarrito'
        }

        this.conectarDB(); // Conecta a la base de datos antes de iniciar el servidor
        this.middlewares();
        this.routes();
        this.SincronizacionModelos();
    }

    async conectarDB() {
        await dbConnection.authenticate();
    }

    async SincronizacionModelos() {
        // Llama a la función de sincronización
        await SincronizacionModelos();
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('public'));

        // Configurar middleware para sesiones
        this.app.use(session({
            secret: 'mi_secreto', // Cambia esto a tu propia clave secreta
            resave: false,
            saveUninitialized: true,
            store: sessionStore,
            cookie: {
                maxAge: 3600000 // Define el tiempo de expiración en milisegundos (en este ejemplo, 1 hora)
            }
        }));
    }

    routes() {
        this.app.use(this.paths.curso, require('../routes/curso'));
        this.app.use(this.paths.carrito, require('../routes/carrito'));
        this.app.use(this.paths.cursocarrito, require('../routes/cursoCarrito'));
    }

    listen() {
        // Sincronizar la tabla de sesiones antes de iniciar el servidor
        sessionStore.sync();

        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto ', this.port);
        })
    }
}

module.exports = Server;

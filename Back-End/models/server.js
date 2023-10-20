const express = require('express');
const cors = require('cors');

const { dbConnection, sessionStore,
     dbConnection2
} = require('../database/config'); // Importa la conexión a la base de datos
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
        this.conectarDB2();
        this.middlewares();
        this.routes();
        this.SincronizacionModelos();
    }

    async conectarDB() {
        await dbConnection.authenticate();
    }

    async conectarDB2() {
        await dbConnection2.authenticate();
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
                maxAge: 1800000 // Define el tiempo de expiración en milisegundos (en este ejemplo, 1 hora)
            }
        }));
    }

    routes() {
        this.app.use(this.paths.curso, require('../routes/curso'));
        this.app.use(this.paths.carrito, require('../routes/carrito'));
        this.app.use(this.paths.cursocarrito, require('../routes/cursoCarrito'))
    }

    // Método para limpieza de sesiones expiradas
    initSessionCleanup() {
        setInterval(() => {
            sessionStore
                .destroyExpiredSessions()
                .then(() => {
                    console.log('Sesiones expiradas eliminadas con éxito');
                })
                .catch((error) => {
                    console.error('Error al eliminar sesiones expiradas:', error);
                });
        }, 3600000); // Ejecuta la limpieza cada hora (ajusta el intervalo según tus necesidades)
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

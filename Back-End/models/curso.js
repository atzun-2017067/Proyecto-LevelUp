const { DataTypes } = require('sequelize');
const { dbConnection } = require('../database/config');

// Define el modelo 'Curso'
const Curso = dbConnection.define('Curso', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombreCurso: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'El nombre del curso no puede estar vacío' // Mensaje personalizado para el error de valor vacío
            }
        }
    },
    modalidad: {
        type: DataTypes.ENUM(['Presencial', 'Virtual, con clases en vivo(sincrónico)']),
        allowNull: false, // No se permite un valor nulo
        validate: {
            notNull: {
                msg: 'La modalidad es requerida' // Mensaje personalizado para el error de valor nulo
            },
            isIn: {
                args: [['Presencial', 'Virtual, con clases en vivo(sincronico)']],
                msg: 'La modalidad debe ser "Presencial" o "Virtual, con clases en vivo(sincronico)"'
            }
        }
    },
    pensum: { // SE CAMBIA A ARCHIVO JSON YA QUE ES TIPO LISTADO
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'El pensum del curso es requerido'
            },
            notEmpty: {
                msg: 'El pensum del curso no puede estar vacío'
            }
        }
    },
    descripcion: {
        type: DataTypes.TEXT,
    },
    requisitosEquipo: {
        type: DataTypes.JSON, // Cambia el tipo de datos a JSON
        allowNull: false,
        get() {
            // Al recuperar los datos, convierte la cadena JSON a un objeto JavaScript
            return JSON.parse(this.getDataValue('requisitosEquipo'));
        },
        set(val) {
            // Al guardar los datos, convierte el objeto JavaScript a una cadena JSON
            this.setDataValue('requisitosEquipo', JSON.stringify(val));
        },
    },
    precioCurso: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'El precio del curso es requerido'
            },
            isDecimal: {
                args: [8, 2], // Asegura que el valor sea un número decimal con 10 dígitos en total y 2 decimales
                msg: 'El precio del curso debe ser un número válido'
            }
        }
    },
    precioPracticaMes: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'El precio de las practicas supervisadas por mes es requerido'
            },
            isDecimal: {
                args: [8, 2],
                msg: 'El precio de las prácticas supervisadas por mes debe ser un número válido'
            }
        }
    },
    duracion: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'La duracion del curso es requerido'
            },
            notEmpty: {
                msg: 'La duracion del curso no puede estar vacío'
            }
        }
    },
    especialidad: {
        type: DataTypes.ENUM(['Marketing', 'Tecnología']),
        allowNull: false,
        validate: {
            notNull: {
                msg: 'La especialidad del curso es requerido'
            },
            isIn: {
                args: [['Marketing', 'Tecnología']],
                msg: 'La especialidad debe ser "Marketing" o "Tecnología"'
            }
        }
    },
    enlaceRegistro: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'El enlace de registro para el usuario es requerido'
            },
            notEmpty: {
                msg: 'El enlace de registro para el usuario no puede estar vacío'
            }
        }
    },
    estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
})

// Exporta el modelo para que pueda ser utilizado en otras partes de la aplicación
module.exports = Curso;
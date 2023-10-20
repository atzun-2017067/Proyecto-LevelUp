// Importa los modelos
const Curso = require('./curso');
const Carrito = require('./carrito');
const CursoCarrito = require('./cursoCarrito');
const Multimedia = require('./multimedia');

// Configura las relaciones
Curso.belongsToMany(Carrito, {
  through: CursoCarrito,
  foreignKey: 'cursoId',
});

Carrito.belongsToMany(Curso, {
  through: CursoCarrito,
  foreignKey: 'carritoId',
});

// Exporta una función para sincronizar los modelos
async function SincronizacionModelos() {
  try {
    // Primero, sincroniza el modelo Multimedia
    await Multimedia.sync({ alter: true });
    console.log('Modelo de Multimedia sincronizado con la base de datos 2');

    await Curso.sync({ alter: true });
    console.log('Modelo de Curso sincronizado con la base de datos');

    await Carrito.sync({ alter: true });
    console.log('Modelo de Carrito sincronizado con la base de datos');

    await CursoCarrito.sync({ alter: true });
    console.log('Modelo de Curso Carrito sincronizado con la base de datos');
  } catch (error) {
    console.error('Error al sincronizar los modelos:', error);
  }
}

module.exports = SincronizacionModelos;

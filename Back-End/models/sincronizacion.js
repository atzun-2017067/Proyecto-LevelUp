// Importa los modelos
const Curso = require('./curso');
const Carrito = require('./carrito');
const CursoCarrito = require('./CursoCarrito');

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